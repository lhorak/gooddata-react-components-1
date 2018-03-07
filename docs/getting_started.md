---
id: gettingStarted
title: Getting Started
sidebar_label: Getting Started
---

## About the GoodData UI SDK

The GoodData UI SDK is a library that provides all the building blocks you need to create a smart business application powered by GoodData.

With the GoodData UI SDK, you can:

- Display saved visualizations from [Analytical Designer](https://secure.gooddata.com/analyze) using the Visualization component
- Create visualizations programmatically on the fly
- Connect interactive controls to your visualization to provide unique user experience (for example, an Attribute Filter dropdown)
- Query GoodData for specific insights into your data to handle them with a custom component


## Supported Technologies

The GoodData UI SDK is built using Node.js, React 15.3.2, and TypeScript.

The GoodData UI SDK is tested against and supports the following:

- Mac, Linux OS
- React 15.3.2, Angular 1, Angular 2
    - For React using Create React App, see How to Create Your First Visualization with GoodData UI SDK.
    - For Angular 1, see How to Use React Components in Angular 1.x.
    - For Angular 2+, see How to Use React Components in Angular 2+.
- TypeScript 2.3+, ES6, ES5

    **WARNING**: The GoodData UI SDK may work with other platforms and operating systems but has not been thoroughly tested yet and may not provide all functionalities.

## Prerequisites

To integrate the GoodData UI SDK in your application, you must meet the following requirements:

- Be familiar with the modern JavaScript ecosystem.
- Have node.js and yarn installed in your development environment. If you do not have these tools installed, you can get them from [Node.js](https://nodejs.org/) (install first) and [Yarn package manager](https://yarnpkg.com/) respectively.
- Have an account on the GoodData platform. If you do not have a GoodData account yet, create a trial one.

    **WARNING** : Examples in this documentation use data from the GoodSales demo project that is available for trial GoodData accounts.

## Installation

```bash
yarn add @gooddata/react-components
```

## Preventing Cross-origin Issues

Your application will need to call the GoodData APIs from <https://secure.gooddata.com/gdc/>. Modern browsers do not permit this because of the security measure known as the [same-origin-policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).

Choose either of the following options to bypass this restriction:
- Local proxy
  
  Set up a local proxy on your server. For information on how to do that, see your server's user documentation. For your convenience, here are links to some common setups:
    - [Local proxy setup in Webpack](https://webpack.github.io/docs/webpack-dev-server.html#proxy)
    - [Local proxy setup in Create react app](https://confluence.intgdc.com/display/VS/Create+Your+First+Visualization+with+GoodData+UI+SDK#CreateYourFirstVisualizationwithGoodDataUISDK-Step4.Preventcross-originissues)
- CORS white-labeling
  
  You can white-label your domain so that requests from this domain are accepted. To have your domain white-labeled, contact the GoodData Support.
  
  For more information about CORS, see [How to Access the GoodData API Directly](https://confluence.intgdc.com/display/VS/How+to+Access+the+GoodData+API+Directly). For more information about white labeling, see [White Label Your Domain](https://help.gooddata.com/display/doc/White+Labelinghttps://help.gooddata.com/display/doc/White+Label+Your+Domain).


## Before You Start Using the GoodData UI SDK

Before you start building your application using the GoodData UI SDK, complete the following tasks:

### Familiarize yourself with the main terms used in the GoodData UI SDK

- visualization is a view into a specific part of your data defined by AFM, resultSpec and a configuration object, usually in a form of a table or graph.
- AFM (Attribute - Filter - Measure) is unified input for creating a visualization using the GoodData UI SDK. AFM describes what data you want to execute: what to measure by measure - how to slice by attribute - how to filter out by filter.
- attribute is a descriptor used to break apart measures and provide context to report data. Attributes dictate how measures are calculated and represented.
- filter is a set of characteristics applied to a visualization or measure to remove values from computed and displayed values.
- measure is aggregation of facts or counts of distinct attribute values, which are represented as numbers in reports. Measures represent what is being measured in a report; for example, sum of sales or average salary.
- resultSpec is an object that defines the structure of result data. For example, you can define a custom title and format for each measure, or sorting of data.

For more details on the terminology, see [Glossary](https://confluence.intgdc.com/display/VS/Glossary).

### Get your project ID

You will need your project ID for the most components to work.

To get your project ID, see [Find the Project ID](https://help.gooddata.com/display/doc/Find+the+Project+ID).

**WARNING** Examples in this documentation use data from the GoodSales demo project with an ID of la84vcyhrq8jwbu4wpipw66q2sqeb923.

### Get resource identifiers

To display visualizations, filters, and other resources, get their identifiers either via the gray pages (see [Accessing Gray Pages for a Project](https://help.gooddata.com/display/developer/Accessing+Gray+Pages+for+a+Project)) or using [gdc-catalog-export](https://confluence.intgdc.com/display/VS/gdc-catalog-export).

## Next Steps

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