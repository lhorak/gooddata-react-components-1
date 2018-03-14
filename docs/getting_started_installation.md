---
id: gs_installation
title: Installation
sidebar_label: Installation
---

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
