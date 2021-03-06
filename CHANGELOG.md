# Changelog

## Unreleased/planned

- We are working on arithmetic measures support.
- We are working on the option to add the secondary axis into certain visualizations (line chart, column chart, bar chart).
- We ask developers to consider using the Headline component instead of the KPI component. The KPI component may be eventually marked as deprecated in one of the next major version.

## 6.0.0

November 1, 2018

[Migration guide](https://sdk.gooddata.com/gooddata-ui/docs/migration_guide_6.html) from version 5.3.

### Added

- Pivot table component ([doc](https://sdk.gooddata.com/gooddata-ui/docs/pivot_table_component.html)) that can be used to create both the pivot and the flat tables. In the future, we plan to use this implementation as a base for the TableComponent.
- Extended capabilities of ChartConfig ([doc](https://sdk.gooddata.com/gooddata-ui/docs/chart_config.html)).
- Added new way how to define custom colors to enable color mapping in the future ([commit](https://github.com/gooddata/gooddata-react-components/commit/8e968fd2b2b5da5fee6059d35ee7d8ae17278295)).
- Heatmap can use custom colors ([commit](https://github.com/gooddata/gooddata-react-components/commit/97563afa58fd01d6a18745b8d14f1a01672575ae)).
- React 16 support ([commit](https://github.com/gooddata/gooddata-react-components/commit/64226babfc81c957bfb6496f69711ddbd54dd49a)).

### Changed

- [breaking] Gooddata.UI license has changed. Now, Gooddata.UI is double licensed. See the license file for details: ([commit](https://github.com/gooddata/gooddata-react-components/commit/b106f79aa2cc23553cf62a0b03955be893a0edd7)).
- [breaking] Heatmap props were renamed ([commit](https://github.com/gooddata/gooddata-react-components/commit/39fe84c07dc84afd607d405035054d87a5a4a2b4) | [doc](https://sdk.gooddata.com/gooddata-ui/docs/heatmap_component.html#properties) | [migration guide](https://sdk.gooddata.com/gooddata-ui/docs/migration_guide_6.html)).
- [breaking] Type definitions of the Area chart "stack by"/"view by" props were changed ([commit](https://github.com/gooddata/gooddata-react-components/commit/02a84754aea64ee7c932b451f6c7463f7a9177cf) | doc | [migration guide](https://sdk.gooddata.com/gooddata-ui/docs/migration_guide_6.html)).
- [breaking] Removed RGBA color definitions. Alpha channel didn’t work with derived measures or on treemap ([commit](https://github.com/gooddata/gooddata-react-components/commit/8e968fd2b2b5da5fee6059d35ee7d8ae17278295) | doc | [migration guide](https://sdk.gooddata.com/gooddata-ui/docs/migration_guide_6.html)).

### Deprecated

- The following AFM components are marked as deprecated and will be removed by the end of September 2019:

  - BarChart
  - ColumnChart
  - LineChart
  - PieChart
  - DonutChart
  - Table
  - Headline
  - AreaChart
  - Treemap
  - Heatmap
  - ScatterPlot

We recommend that you begin using corresponding visual components with the same name instead. See our [migration guide to v 5.0.0](https://sdk.gooddata.com/gooddata-ui/docs/migration_guide_5.md#components-with-buckets-interface) for details.

### Removed

- React 15 support.

### Fixed

- Heatmap with bucket interface had switched the meaning of each bucket prop.
- Other bug fixes and internal improvements.

## 5.3.2 (September 27, 2018)

- Added description of data used in examples ([commit](https://github.com/gooddata/gooddata-react-components/commit/a0d7c54445325aecfeb5bd898bc3615fb67c2032))

## 5.3.1 (September 4, 2018)

- Heatmap bugfix ([commit](https://github.com/gooddata/gooddata-react-components/commit/7553681f471748de999430746944573b081ec88b))

## 5.3.0 (August 23, 2018)

- Added Heatmap chart ([commit](https://github.com/gooddata/gooddata-react-components/commit/660b01d949e08623f2cc1b3e7a091ca16efaf29e))
- Improved label rendering in Treemaps ([commit](https://github.com/gooddata/gooddata-react-components/pull/440/commits/5d5d002128e15f31e2af27b2ccccec4a809db0c9))
- Extended the existing examples and added new ones
- Added miscellaneous bugfixes and minor improvements

## 5.2.0 (August 10, 2018)

- Added Bubble chart ([commit](https://github.com/gooddata/gooddata-react-components/commit/2e4031b9296275e60a4c90b171fa7c2064c0e11e))
- Added Treemap chart ([commit](https://github.com/gooddata/gooddata-react-components/commit/05a77cc4041680468290e7af8eb089698f2afd69))
- Changed the way how Area chart renders null values ([commit](https://github.com/gooddata/gooddata-react-components/commit/65e923ed9ed6d23c3c0530b2e95df5beca7f1aa9))
- Added the time over time comparison feature ([commit](https://github.com/gooddata/gooddata-react-components/pull/424/commits/a54ec123589809f71c6aa00e534f099b1bbf06e2))
- Added the option to add the second measure to headlines ([commit](https://github.com/gooddata/gooddata-react-components/commit/15aa8a17cad493c2a9b2651c7622e9df878b13e8))
- Extended the existing examples and added new ones
- Added miscellaneous bugfixes and minor improvements

## 5.1.0 (June 7, 2018)

- Added Scatter Plot chart ([commit](https://github.com/gooddata/gooddata-react-components/commit/77b748a40b620a5233a370bf8110fdba87b282f3))
- Added Donut chart ([commit](https://github.com/gooddata/gooddata-react-components/commit/a703cd78f5095c6df6c73c716c7865b17913ad73))
- Moved the code from @gooddata/indigo-visualization to @gooddata/react-components and deprecated indigo-visualizations ([commit](https://github.com/gooddata/gooddata-react-components/commit/7a5ec756f39d4d222e2eb102f94f929aae0d44fc))
- Increased the usage of TypeScript ([commit](https://github.com/gooddata/gooddata-react-components/commit/265fda101384f83fb2b530192c0d065de2970ba2))
- Extended the existing examples and added new ones
- Added miscellaneous bugfixes and minor improvements

## 5.0.0 (April 26, 2018)

 - Ability to have visualizations from different domains on the same page ([commit](https://github.com/gooddata/gooddata-react-components/commit/c73c8f272e0461bde48c202e5f630271f709e279))
 - Upgrade React to 15.6.2 ([commit](https://github.com/gooddata/gooddata-react-components/commit/bd4cac04141f50dbeb237e417377cc77a4b0f484))
 - Components with buckets interface ([commit](https://github.com/gooddata/gooddata-react-components/commit/c7ca0819651879903c1270c9db26aa46a97cf62f))
 - Headline visualization with one measure ([commit](https://github.com/gooddata/gooddata-react-components/commit/f3b9e0e33cc5a3156243714201b76af74c27a757))
 - Headline with secondary measure ([commit](https://github.com/gooddata/gooddata-react-components/commit/a025abb677ad7d250dd43063b34557bfb3120d8e))
 - Area chart ([commit](https://github.com/gooddata/gooddata-react-components/commit/fb3cbddecf45fabb9cc30fc34f2c08dca170a17f))
 - Default loadings and errors ([commit](https://github.com/gooddata/gooddata-react-components/commit/235bd3f7cd4d88613356b8e3c8b80a7ee3aaea61))
 - Remove backward compatible CatalogHelper code ([commit](https://github.com/gooddata/gooddata-react-components/commit/68796d866458be889dbc52509ee757a3bc0eb957))
 - Allow disabled gridline ([commit](https://github.com/gooddata/gooddata-react-components/commit/a3bd32e54a72aa5bf9433a46bd1331a7e66b1bba))
 - Remove ErrorState.OK from the onError callback ([commit](https://github.com/gooddata/gooddata-react-components/commit/a7d0eab65b12e576bd64b76e12f9759c2faf9487))
 - Removed execution responses wrappers ([commit](https://github.com/gooddata/gooddata-react-components/commit/c6ae42d4af2711949eecf64d68d50d2f134fb90e))
