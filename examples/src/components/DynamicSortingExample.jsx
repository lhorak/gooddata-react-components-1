// (C) 2007-2018 GoodData Corporation
/* eslint-disable react/jsx-closing-tag-location */
import React, { Component } from 'react';
import { ColumnChart } from '@gooddata/react-components';
import '@gooddata/react-components/styles/css/main.css';

import {
    totalSalesIdentifier,
    locationStateDisplayFormIdentifier,
    locationStateAttributeCaliforniaUri,
    monthDateIdentifier,
    monthDateIdentifierJanuary,
    projectId
} from '../utils/fixtures';

import {
    createMeasureBucketItem,
    createAttributeBucketItem,
    createAttributeSortItem,
    createMeasureSortItem
} from '../utils/helpers';

export class DynamicSortingExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortOption: undefined,
            direction: 'asc'
        };
    }

    onSortOptionChange = sortOption => () => {
        this.setState({
            sortOption
        });
    }

    onDirectionChange = direction => () => {
        this.setState({
            direction
        });
    }

    getOrderLabel = dir => ({
        desc: 'descending',
        asc: 'ascending'
    }[dir]);

    render() {
        const { direction } = this.state;
        const sortOptions = [
            {
                key: 'default',
                label: 'Default sorting',
                overrideDirection: 'asc',
                description: () => 'By default, the chart is sorted by the date attribute dir ascending order',
                sortBy: () => ([])
            },
            {
                key: 'state',
                label: 'State',
                description: dir => `The column stacks (states) are sorted alphabetically by the label of the state attribute in ${this.getOrderLabel(dir)} order.`,
                sortBy: dir => ([createAttributeSortItem(locationStateDisplayFormIdentifier, dir)])
            },
            {
                key: 'date',
                label: 'Date attribute',
                description: dir => `The columns (date) are sorted by the value of the date attribute in ${this.getOrderLabel(dir)} order.`,
                sortBy: dir => ([createAttributeSortItem(monthDateIdentifier, dir)])
            },
            {
                key: 'sum-of-column',
                label: 'Date attribute by sum of the column',
                description: dir => `The columns (date) are sorted by the sum of the Total Sales stacks in each column in ${this.getOrderLabel(dir)} order.`,
                sortBy: dir => ([createAttributeSortItem(monthDateIdentifier, dir, 'sum')])
            },
            {
                key: 'sum-of-stacks',
                label: 'State attribute by sum of individual stacks',
                description: dir => `The stacks (state) are sorted by the sum of the Total Sales stacks across all columns in ${this.getOrderLabel(dir)} order.`,
                sortBy: dir => ([createAttributeSortItem(locationStateDisplayFormIdentifier, dir, 'sum')])
            },
            {
                key: 'state-element',
                label: 'Measure of California',
                description: dir => `The columns (date) are sorted by the value of the Total Sales of California stack in ${this.getOrderLabel(dir)} order.`,
                sortBy: dir => ([
                    createMeasureSortItem(
                        totalSalesIdentifier,
                        dir,
                        [locationStateDisplayFormIdentifier, locationStateAttributeCaliforniaUri]
                    )
                ])
            },
            {
                key: 'date-element',
                label: 'Measure of January',
                description: dir => `The column stacks (states) are sorted by the value of Total Sales in the January column in ${this.getOrderLabel(dir)} order.`,
                sortBy: dir => ([
                    createMeasureSortItem(
                        totalSalesIdentifier,
                        dir,
                        [monthDateIdentifier, monthDateIdentifierJanuary]
                    )
                ])
            },
            {
                key: 'multi',
                label: 'Multi-sort',
                overrideDirection: 'niether',
                description: () => 'You can combine multiple sortItems together, even mix different directions.',
                sortBy: () => ([
                    createMeasureSortItem(
                        totalSalesIdentifier,
                        'asc',
                        [locationStateDisplayFormIdentifier, locationStateAttributeCaliforniaUri]
                    ),
                    createMeasureSortItem(
                        totalSalesIdentifier,
                        'desc',
                        [monthDateIdentifier, monthDateIdentifierJanuary]
                    )
                ])
            }
        ];

        const { sortOption = sortOptions[0] } = this.state;

        const isAsc = sortOption.overrideDirection ? sortOption.overrideDirection === 'asc' : direction === 'asc';
        const isDesc = sortOption.overrideDirection ? sortOption.overrideDirection === 'desc' : direction === 'desc';

        return (
            <div className="s-dynamic-sorting">
                {/* language=CSS */}
                <style jsx>{`
                    .sorting-options {
                        margin: -10px -10px 10px -10px;
                        display: flex;
                        flex-wrap: wrap;
                    }
                    .sorting-option {
                        margin: 5px 10px;
                    }
                    .sorting-label {
                        margin: 5px 10px;
                        padding: 6px 0;
                    }
                `}</style>
                <div className="sorting-options">
                    <span className="sorting-label" >Sort by</span>
                    {
                        sortOptions.map((sortOptionItem) => {
                            return (<button
                                key={sortOptionItem.key}
                                className={`sorting-option button button-secondary s-${sortOptionItem.key} ${sortOption.key === sortOptionItem.key ? ' is-active' : ''}`}
                                onClick={this.onSortOptionChange(sortOptionItem)}
                            >{sortOptionItem.label}</button>);
                        })
                    }
                </div>
                <div className="sorting-options">
                    <span className="sorting-label" >Direction</span>
                    <button
                        className={`sorting-option button button-secondary s-ascending${isAsc ? ' is-active' : ''}`}
                        onClick={this.onDirectionChange('asc')}
                    >Ascending</button>
                    <button
                        className={`sorting-option button button-secondary s-descending${isDesc ? ' is-active' : ''}`}
                        onClick={this.onDirectionChange('desc')}
                    >Descending</button>
                </div>
                <p>{sortOption.description(direction)}</p>

                <hr className="separator" />

                <div style={{ height: 600 }} className="s-dynamic-sorting-chart" >
                    <ColumnChart
                        projectId={projectId}
                        measures={[createMeasureBucketItem(totalSalesIdentifier)]}
                        viewBy={createAttributeBucketItem(monthDateIdentifier)}
                        stackBy={createAttributeBucketItem(locationStateDisplayFormIdentifier)}
                        sortBy={sortOption.sortBy(direction)}
                    />
                </div>
            </div>
        );
    }
}

export default DynamicSortingExample;
