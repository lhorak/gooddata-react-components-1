// (C) 2007-2018 GoodData Corporation
import {
    getDataLabelAttributes,
    isLabelOverlappingItsShape,
    intersectsParentLabel,
    showDataLabelInAxisRange,
    showStackLabelInAxisRange,
    getShapeVisiblePart
} from '../dataLabelsHelpers';

import {
    IRectBySize, IAxisRange
} from '../helpers';

describe('dataLabelsHelpers', () => {
    describe('getDataLabelAttributes', () => {
        const hiddenAttributes: IRectBySize = {
            x: 0,
            y: 0,
            height: 0,
            width: 0
        };

        it('should position data label when in range', () => {
            const result = getDataLabelAttributes({
                dataLabel: {
                    parentGroup: {
                        translateX: 0,
                        translateY: 0
                    },
                    x: 1,
                    y: 1,
                    width: 100,
                    height: 100
                }
            });

            expect(result).toEqual({
                x: 1,
                y: 1,
                width: 100,
                height: 100
            });
        });

        it('should hide data label when outside range', () => {
            const result = getDataLabelAttributes({
                dataLabel: {
                    parentGroup: {
                        translateX: 0,
                        translateY: 0
                    },
                    x: -200,
                    y: -200,
                    width: 100,
                    height: 100
                }
            });

            expect(result).toEqual(hiddenAttributes);
        });

        it('should hide label when label not present on point', () => {
            const result = getDataLabelAttributes({
                dataLabel: null
            });

            expect(result).toEqual(hiddenAttributes);
        });

        it('should hide label when label present but parentgroup missing', () => {
            const result = getDataLabelAttributes({
                dataLabel: {
                    parentGroup: null
                }
            });

            expect(result).toEqual(hiddenAttributes);
        });
    });

    describe('isLabelOverlappingItsShape', () => {
        const shape = {
            width: 100,
            height: 100
        };

        it('should return false when label smaller than shape', () => {
            const point = {
                dataLabel: {
                    width: 50,
                    height: 50
                },
                shapeArgs: shape
            };

            expect(isLabelOverlappingItsShape(point)).toBeFalsy();
        });

        it('should return true when label is wider than shape', () => {
            const point = {
                dataLabel: {
                    width: 150,
                    height: 50
                },
                shapeArgs: shape
            };

            expect(isLabelOverlappingItsShape(point)).toBeTruthy();
        });

        it('should return true when label is higher than shape', () => {
            const point = {
                dataLabel: {
                    width: 50,
                    height: 150
                },
                shapeArgs: shape
            };

            expect(isLabelOverlappingItsShape(point)).toBeTruthy();
        });

        it('should work also for circle', () => {
            const point = {
                dataLabel: {
                    width: 50,
                    height: 150
                },
                shapeArgs: {
                    r: 20
                }
            };

            expect(isLabelOverlappingItsShape(point)).toBeTruthy();
        });
    });

    describe('intersectsParentLabel', () => {
        function createPointWithLabel(parentId: any, dataLabel: any) {
            return {
                parent: parentId,
                dataLabel
            };
        }

        const points = [
            createPointWithLabel(undefined, { x: 0, y: 0, width: 10, height: 10 }),
            createPointWithLabel('0', { x: 100, y: 100, width: 10, height: 10 }),
            createPointWithLabel('0', { x: 0, y: 0, width: 10, height: 10 })
        ];

        it('should return false if no parent given', () => {
            const intersects = intersectsParentLabel(points[0], points);
            expect(intersects).toEqual(false);
        });

        it('should return false if parent given but no intersection', () => {
            const intersects = intersectsParentLabel(points[1], points);
            expect(intersects).toEqual(false);
        });

        it('should return true if parent given and intersects', () => {
            const intersects = intersectsParentLabel(points[2], points);
            expect(intersects).toEqual(true);
        });
    });

    describe('showDataLabelInAxisRange', () => {
        const axisRange: IAxisRange = {
            minAxisValue: 5,
            maxAxisValue: 10
        };
        let point: any;
        beforeEach(() => {
            point = {
                y: 8,
                dataLabel: {
                    x: 50,
                    y: 50,
                    width: 50,
                    height: 50,
                    show: jest.fn(),
                    hide: jest.fn(),
                    xSetter: jest.fn(),
                    ySetter: jest.fn(),
                    parentGroup: {
                        translateX: 0,
                        translateY: 0
                    }
                }
            };
        });

        it('should keep shown data label when inside axis range', () => {
            showDataLabelInAxisRange(point, point.y, axisRange);
            expect(point.dataLabel.hide).not.toHaveBeenCalled();
        });

        it('should hide data label when outside axis range', () => {
            point.y = 20;
            showDataLabelInAxisRange(point, point.y, axisRange);
            expect(point.dataLabel.hide).toHaveBeenCalled();
        });
    });

    describe('showStackLabelInAxisRange', () => {
        const axisRange: IAxisRange = {
            minAxisValue: 5,
            maxAxisValue: 10
        };
        let point: any;
        beforeEach(() => {
            point = {
                y: 8,
                total: 20,
                stackY: 10,
                dataLabel: {
                    x: 50,
                    y: 50,
                    width: 50,
                    height: 50,
                    show: jest.fn(),
                    hide: jest.fn(),
                    xSetter: jest.fn(),
                    ySetter: jest.fn(),
                    parentGroup: {
                        translateX: 0,
                        translateY: 0
                    }
                }
            };
        });

        it('should keep shown data label when inside axis range', () => {
            showStackLabelInAxisRange(point, axisRange);
            expect(point.dataLabel.hide).not.toHaveBeenCalled();
        });

        it('should hide data label when outside axis range', () => {
            point.y = 10;
            point.stackY = 20;
            showStackLabelInAxisRange(point, axisRange);
            expect(point.dataLabel.hide).toHaveBeenCalled();
        });

        it('should show last data label without stackY', () => {
            delete(point.stackY);
            point.total = 10;
            showStackLabelInAxisRange(point, axisRange);
            expect(point.dataLabel.hide).not.toHaveBeenCalled();
        });

        it('should hide last data label without stackY', () => {
            delete (point.stackY);
            showStackLabelInAxisRange(point, axisRange);
            expect(point.dataLabel.hide).toHaveBeenCalled();
        });
    });

    describe('getShapeVisiblePart', () => {
        const chart = {
            clipBox: {
                height: 50,
                width: 50
            }
        };

        it ('should return whole size of shape when it\'s not truncated by min and max', () => {
            const shape = {
                x: 0,
                y: 0,
                width: 100,
                height: 50
            };

            expect(getShapeVisiblePart(shape, chart, shape.height)).toBe(50);
        });

        it ('should return clipped part of shape when truncated by min', () => {
            const shape = {
                x: 0,
                y: 20,
                width: 100,
                height: 50
            };

            expect(getShapeVisiblePart(shape, chart, shape.height)).toBe(30);
        });

        it ('should return clipped part of shape when truncated by max', () => {
            const shape = {
                x: 0,
                y: -30,
                width: 100,
                height: 50
            };

            expect(getShapeVisiblePart(shape, chart, shape.height)).toBe(20);
        });
    });
});
