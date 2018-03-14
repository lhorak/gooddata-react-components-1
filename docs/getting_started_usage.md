---
id: gs_usage
title: Usage
sidebar_label: Usage
---

Before you start building your application using the GoodData UI SDK, complete the following tasks:

## Familiarize yourself with the main terms used in the GoodData UI SDK

- visualization is a view into a specific part of your data defined by AFM, resultSpec and a configuration object, usually in a form of a table or graph.
- AFM (Attribute - Filter - Measure) is unified input for creating a visualization using the GoodData UI SDK. AFM describes what data you want to execute: what to measure by measure - how to slice by attribute - how to filter out by filter.
- attribute is a descriptor used to break apart measures and provide context to report data. Attributes dictate how measures are calculated and represented.
- filter is a set of characteristics applied to a visualization or measure to remove values from computed and displayed values.
- measure is aggregation of facts or counts of distinct attribute values, which are represented as numbers in reports. Measures represent what is being measured in a report; for example, sum of sales or average salary.
- resultSpec is an object that defines the structure of result data. For example, you can define a custom title and format for each measure, or sorting of data.

For more details on the terminology, see [Glossary](https://confluence.intgdc.com/display/VS/Glossary).

## Get your project ID

You will need your project ID for the most components to work.

To get your project ID, see [Find the Project ID](https://help.gooddata.com/display/doc/Find+the+Project+ID).

> **WARNING**
>
> Examples in this documentation use data from the GoodSales demo project with **Project ID**: `la84vcyhrq8jwbu4wpipw66q2sqeb923`.

## Get resource identifiers

To display visualizations, filters, and other resources, get their identifiers either via the gray pages (see [Accessing Gray Pages for a Project](https://help.gooddata.com/display/developer/Accessing+Gray+Pages+for+a+Project)) or using [gdc-catalog-export](https://confluence.intgdc.com/display/VS/gdc-catalog-export).

# Next Steps

Now, you can start building your application.

We have a number of tutorials to help you start your development:

- [How to Create Your First Visualization with GoodData UI SDK](https://confluence.intgdc.com/display/VS/How+to+Create+Your+First+Visualization+with+GoodData+UI+SDK)
- [How to Build an App](https://confluence.intgdc.com/display/VS/How+to+Build+an+App)
- [How to Connect Filters to a Visualization](https://confluence.intgdc.com/display/VS/How+to+Connect+Filters+to+a+Visualization)
- [How to Use React Components in Angular 1.x](https://confluence.intgdc.com/display/VS/How+to+Use+React+Components+in+Angular+1.x)
- [How to Use React Components in Angular 2+](https://confluence.intgdc.com/pages/viewpage.action?pageId=178589112)
- [How to Access the GoodData API Directly](https://confluence.intgdc.com/display/VS/How+to+Access+the+GoodData+API+Directly)
- [How to Configure a Webpack Proxy](https://confluence.intgdc.com/display/VS/How+to+Configure+a+Webpack+Proxy)
- [How to Set Up a Loading State for Embedded Insights](https://confluence.intgdc.com/display/VS/How+to+Set+Up+a+Loading+State+for+Embedded+Insights)