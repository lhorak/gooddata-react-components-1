// (C) 2007-2018 GoodData Corporation
import { AFM, Execution } from '@gooddata/typings';
import range = require('lodash/range');

import {
    DEFAULT_COLOR_PALETTE,
    HEATMAP_BLUE_COLOR_PALETTE,
    getLighterColor,
    normalizeColorToRGB,
    getRgbString,
    isCustomPalette
} from '../utils/color';

import {
    isHeatmap,
    isOneOfTypes,
    isTreemap
} from '../utils/common';

import { VisualizationTypes } from '../../../constants/visualizationTypes';

import {
    isDerivedMeasure,
    findParentMeasureIndex
} from './chartOptionsBuilder';
import { IColorPalette, IColorPaletteItem } from './Chart';

export interface IColorStrategy {
    getColorByIndex(index: number): string;
}
export type HighChartColorPalette = string[];
export type MeasureGroupType = Execution.IMeasureGroupHeader['measureGroupHeader'];
export const attributeChartSupportedTypes = [
    VisualizationTypes.PIE,
    VisualizationTypes.DONUT,
    VisualizationTypes.FUNNEL,
    VisualizationTypes.SCATTER,
    VisualizationTypes.BUBBLE
];

export abstract class ColorStrategy implements IColorStrategy {
    protected palette: HighChartColorPalette;
    constructor(
        colorPalette: IColorPalette,
        measureGroup: MeasureGroupType,
        viewByAttribute: any,
        stackByAttribute: any,
        afm: AFM.IAfm
    ) {
        this.palette = this.createPalette(
            colorPalette,
            measureGroup,
            viewByAttribute,
            stackByAttribute,
            afm);
    }

    public getColorByIndex(index: number): string {
        return this.palette[index];
    }

    protected abstract createPalette(
        colorPalette: IColorPalette,
        measureGroup: MeasureGroupType,
        viewByAttribute: any,
        stackByAttribute: any,
        afm: AFM.IAfm
    ): HighChartColorPalette;
}
const emptyColorPaletteItem = { guid: 'none', fill: { r: 0, g: 0, b: 0 } };

export class MeasureColorStrategy extends ColorStrategy {
    protected createPalette(
        colorPalette: IColorPalette,
        measureGroup: MeasureGroupType,
        _viewByAttribute: any,
        _stackByAttribute: any,
        afm: AFM.IAfm
    ): HighChartColorPalette {
        let parentMeasuresCounter = 0;

        const paletteMeasures = range(measureGroup.items.length).map((measureItemIndex) => {
            if (isDerivedMeasure(measureGroup.items[measureItemIndex], afm)) {
                return emptyColorPaletteItem;
            }
            const colorIndex = parentMeasuresCounter % colorPalette.length;
            parentMeasuresCounter++;
            return colorPalette[colorIndex];
        });

        return paletteMeasures.map((color, measureItemIndex) => {
            if (!isDerivedMeasure(measureGroup.items[measureItemIndex], afm)) {
                return getRgbString(color);
            }
            const parentMeasureIndex = findParentMeasureIndex(afm, measureItemIndex);
            if (parentMeasureIndex > -1) {
                const sourceMeasureColor = paletteMeasures[parentMeasureIndex];
                return getLighterColor(normalizeColorToRGB(getRgbString(sourceMeasureColor)), 0.6);
            }
            return getRgbString(color);
        });
    }
}

export class AttributeColorStrategy extends ColorStrategy {
    protected createPalette(
        colorPalette: IColorPalette,
        _measureGroup: MeasureGroupType,
        viewByAttribute: any,
        stackByAttribute: any,
        _afm: AFM.IAfm
    ): HighChartColorPalette {
        const itemsCount = stackByAttribute ? stackByAttribute.items.length : viewByAttribute.items.length;
        return range(itemsCount).map(itemIndex => getRgbString(colorPalette[itemIndex % colorPalette.length]));
    }
}

export class HeatMapColorStrategy extends ColorStrategy {
    public getColorByIndex(index: number): string {
        return this.palette[index % this.palette.length];
    }

    protected createPalette(
        colorPalette: IColorPalette,
        _measureGroup: MeasureGroupType,
        _viewByAttribute: any,
        _stackByAttribute: any,
        _afm: AFM.IAfm
    ): HighChartColorPalette {
        if (colorPalette && isCustomPalette(colorPalette) && colorPalette[0]) {
            return this.getCustomHeatmapColorPalette(colorPalette[0]);
        }
        return HEATMAP_BLUE_COLOR_PALETTE;
    }

    private getCustomHeatmapColorPalette(baseColor: IColorPaletteItem): HighChartColorPalette {
        const { r, g, b } = baseColor.fill;
        const colorItemsCount = 6;
        const channels = [r, g, b];
        const steps = channels.map(channel => (255 - channel) / colorItemsCount);
        const generatedColors = this.getCalculatedColors(colorItemsCount, channels, steps);
        return [
            'rgb(255,255,255)',
            ...generatedColors.reverse(),
            getRgbString(baseColor)
        ];
    }
    private getCalculatedColors(count: number, channels: number[], steps: number[]): HighChartColorPalette {
        return range(1, count)
            .map((index: number) =>
                `rgb(${this.getCalculatedChannel(channels[0], index, steps[0])},` +
                    `${this.getCalculatedChannel(channels[1], index, steps[1])},` +
                    `${this.getCalculatedChannel(channels[2], index, steps[2])})`);
    }

    private getCalculatedChannel(channel: number, index: number, step: number): number {
        return Math.trunc(channel + index * step);
    }
}

export class TreeMapColorStrategy extends MeasureColorStrategy {
    protected createPalette(
        colorPalette: IColorPalette,
        measureGroup: MeasureGroupType,
        viewByAttribute: any,
        stackByAttribute: any,
        afm: AFM.IAfm
    ): HighChartColorPalette {
        if (viewByAttribute) {
            const itemsCount = viewByAttribute.items.length;
            return range(itemsCount).map(itemIndex => getRgbString(colorPalette[itemIndex % colorPalette.length]));
        }
        return super.createPalette(
            colorPalette,
            measureGroup,
            viewByAttribute,
            stackByAttribute,
            afm
        );
    }
}

export function isAttributeColorPalette(type: string, afm: AFM.IAfm, stackByAttribute: any) {
    const attributeChartSupported = isOneOfTypes(type, attributeChartSupportedTypes);
    return stackByAttribute || (attributeChartSupported && afm.attributes && afm.attributes.length > 0);
}

export class ColorFactory {
    public static getColorStrategy(
        colorPalette: IColorPalette = DEFAULT_COLOR_PALETTE,
        measureGroup: MeasureGroupType,
        viewByAttribute: any,
        stackByAttribute: any,
        afm: AFM.IAfm,
        type: string
    ): IColorStrategy {

        if (isHeatmap(type)) {
            return new HeatMapColorStrategy(
                colorPalette,
                measureGroup,
                viewByAttribute,
                stackByAttribute,
                afm);
        }

        if (isTreemap(type)) {
            return new TreeMapColorStrategy(
                colorPalette,
                measureGroup,
                viewByAttribute,
                stackByAttribute,
                afm);
        }

        if (isAttributeColorPalette(type, afm, stackByAttribute)) {
            return new AttributeColorStrategy(
                colorPalette,
                measureGroup,
                viewByAttribute,
                stackByAttribute,
                afm);
        }

        return new MeasureColorStrategy(
            colorPalette,
            measureGroup,
            viewByAttribute,
            stackByAttribute,
            afm);
    }
}
