# Attributes Kit [![Circle CI](https://img.shields.io/circleci/token/b2737c94f42fff64565fe49cf0bd5d776f091bdd/project/apiaryio/attributes-kit/master.svg)](https://circleci.com/gh/apiaryio/attributes-kit)

Attributes Kit is a (as the name suggest) kit which helps you with rendering [MSON](https://github.com/apiaryio/mson) (plain-text, human and machine readable, description format for describing data structures).

For instance—it turns the following...


```Markdown
- id: 1
- name: A green door
- price: 12.50
- tags: home, green
```

...into this.

![image](https://cloud.githubusercontent.com/assets/95191/9908622/d160352a-5c94-11e5-8c90-bc1e22b02664.png)

Please see the **[list of supported features →](#mson-features)**

### Preview

This application has been deployed to Heroku, **try it out at [attributes-kit.herokuapp.com](https://attributes-kit.herokuapp.com)**.

---

## Table of Contents

* [Getting Started](#getting-started)
* [Status](#status)
* [Compatibility](#compatibility)
* [Usage](#usage)
  * [API](#api)
  * [Browser](#browser)
  * [Server](#server)
* [Developing](#developing)
  * [Installation](#installation)
  * [Playground](#testing)
  * [Testing](#testing)
* [Versioning](#versioning)
* [Contributing](#testing)
* [Troubleshooting](#troubleshooting)
* [Code of Conduct](#code-of-conduct)
* [License](#license)

---

# Getting Started

> _**Note:**_ Attributes Kit hasn't been published to NPM just yet, before we do that, please `git clone` the repository.

1. **Clone the repository**

  ```bash
  $ git clone git@github.com:apiaryio/attributes-kit.git
  ```

2. **Install dependencies**

  ```bash
  cd ./attributes-kit
  npm install
  ```

3. **Run it**

  ```bash
  npm start
  ```

  You can go to [localhost:8080](http://localhost:8080) to try out the [Playground](https://attributes-kit.herokuapp.com/), or to [/examples.html](http://localhost:8080/examples.html) to see the list of examples.

4. **Use it**

  Render the Attributes Kit using the `render` method.

  ```JavaScript
  import AttributesKit from 'attributes-kit';

  let attributes = new AttributesKit({element, options});
  attributes.render(data);
  ```

  Or you can use the React component directly.

  ```JavaScript
  import {Attributes} from 'attributes-kit';

  // E.g. <Attributes data={data} />
  ```

You're done! **Great job!** :+1:

---

# Status

Please see the [`STATUS.md`](./STATUS.md) file.

---

# Compatibility

## Node

![](https://img.shields.io/npm/v/npm.svg)
![](https://img.shields.io/node/v/gh-badges.svg)

:point_right: You are using version `0.10.39` (or newer) of Node

```Bash
node -v
0.10.39
```

:point_right: You are using version `2.11.3` (or newer) of NPM

```Bash
npm -v
2.11.3
```

## Browsers

| Browser                 |
|:------------------------|
| ![](https://img.shields.io/badge/Google%20Chrome-15+-blue.svg) |
| ![](https://img.shields.io/badge/Safari-6.1+-lightgrey.svg) |
| ![](https://img.shields.io/badge/Firefox-28+-orange.svg) |
| ![](https://img.shields.io/badge/Edge-12+-blue.svg) |
| ![](https://img.shields.io/badge/IE-11+-blue.svg) |
| ![](https://img.shields.io/badge/Opera-12.1+-red.svg) |

---

# Usage

* [API](#api)
* [Browser](#browser)
* [Server](#server)

## API

* [`render` Method](#render-method)
* [Class Instance](#class-instance)
* [React Component](#react-component)

#### `render` Method

```JavaScript
import AttributesKit from 'attributes-kit';

AttributesKit.render(data, element, options);
```

#### Class Instance

```JavaScript
import AttributesKit from 'attributes-kit';

let attributes = new AttributesKit({element, options});
attributes.render(data);
```

#### React Component

```JavaScript
import ReactDom from 'react-dom';
import {Attributes} from 'attributes-kit';

ReactDom.render(<Attributes data={data} />, element);
```

### Parameters

Attributes Kit always takes the same parameters.

| Parameter | Description |
|:----------|:-----------|
| `data`    | [Refract](https://github.com/refractproject/refract-spec) element to be rendered. |
| `element` | A DOM node or a CSS selector; Attributes Kit will be rendered inside the element. |
| `options` | An options object to customize the rendering. |

## Browser

1. **Install the package**

  ```Bash
  npm install attributes-kit
  ```

2. **Require the package**

  ###### ES6

  ```JavaScript
  import AttributesKit from 'attributes-kit';
  ```

  ###### ES5

  ```JavaScript
  var AttributesKit = require('attributes-kit');
  ```

3. **Use it**

  Use the Attributes Kit, you can see the [API](#api).

### `<script>` tag

If you prefer to drop a `<script>` tag in your page, here's how to do it. Just a note—all builds do support [UMD](https://github.com/umdjs/umd) ([AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) and [CommonJS](http://wiki.commonjs.org/wiki/CommonJS)) out of the box.

1. **Download the latest release**

  Go to the [Releases](https://github.com/apiaryio/attributes-kit/releases) page and download the latest release.

2. **Choose the build**

  You can download the build directly, or all builds are located in the `dist` folder.

  | Development Build       |
  |:------------------------|
  | [attributes-kit.js]()   |
  | Works out of the box, the uncompressed file is best used during development or debugging. |

  | Production Build        |
  |:------------------------|
  | [attributes-kit-min.js](); [attributes-kit-min.js.map]() |
  | Works out of the box, compressed version saves bandwidth and improves performance in production. `attributes-kit-min.js.map` is not required to run the Kit. |

3. **Drop the `<script>` tag**

  ```HTML
  <script src="./attributes-kit.js"></script>
  ```

4. **Use it**

  ```JavaSript
  var AttributesKit = window.AttributesKit;
  AttributesKit.render(data, element, options);
  ```

  Please see the [API](#api).

### Advanced

There are two more builds mainly for more advanced use cases.

| Build without React     |
|:------------------------|
| [`attributes-kit-no-react.js`]() |
| This build *does not* contain React dependency. You have to install React manually, or your application lists React in its dependencies (in `package.json`). |

| Build without dependencies |
|:---------------------------|
| [`attributes-kit-no-deps.js`]() |
| This build *does not* contain any dependencies of the Attributes Kit. You have to install all dependencies manually, or your application lists them all in (e.g.) `package.json`. |

## Server

You can use the Attributes Kit on the server too. For instance—you can generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl you pages for SEO purposes.

1. **Install the package**

  ```Bash
  npm install attributes-kit
  ```

2. **Require the package**

  Please mind the `dist/attributes-kit-server` suffix.

  ###### ES6

  ```JavaScript
  import AttributesKit from 'attributes-kit/dist/attributes-kit-server';
  ```

  ###### ES5

  ```JavaScript
  var AttributesKit = require('attributes-kit/dist/attributes-kit-server');
  ```

3. **Use it**

  ```JavaScript
  import React from 'react';
  import ReactDomServer from 'react-dom/server'
  import {Attributes} from 'attributes-kit/dist/attributes-kit-server';

  const element = React.createElement(Attributes, {
    data: [Refract Element]
  });

  ReactDomServer.renderToString(element);
  ```

---

## Developing

### Installation

1. Clone the repository

  ```bash
  $ git clone git@github.com:apiaryio/attributes-kit.git
  ```

2. Install dependencies

  ```bash
  cd ./attributes-kit
  npm install
  ```

3. Run it

  ```bash
  npm start
  ```

**Congratulations!** You are all set to start developing now! :rocket:

## Playground

## Testing

---

# Versioning

[Attributes Kit](https://github.com/apiaryio/attributes-kit) is maintained under the [Semantic Versioning guidelines](http://semver.org/spec/v2.0.0.html). Releases will be numbered with the following format.

```
<major>.<minor>.<patch>
```

And constructed with the following guidelines.

* Breaking backwards compatibility bumps the `<major>`
* New additions without breaking backwards compatibility bumps the `<minor>`
* Bug fixes and misc changes bump the `<patch>`

Please see the [Releases](https://github.com/apiaryio/attributes-kit/releases) section of our GitHub project for changelog.

---

# Contributing

Please see the [Contributions guidelines](./CONTRIBUTING.md).

---

# Troubleshooting

---

# Code of Conduct

This project adheres to the [Open Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to honor this code.

---

# License

[MIT](./LICENSE.md).

