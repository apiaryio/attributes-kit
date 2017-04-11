# Attributes Kit [![Circle CI](https://img.shields.io/circleci/project/apiaryio/attributes-kit/master.svg)](https://circleci.com/gh/apiaryio/attributes-kit)

Attributes Kit is a (as the name suggest) kit which helps you with rendering [MSON](https://github.com/apiaryio/mson) (plain-text, human and machine readable, description format for describing data structures).

For instance—it turns the following...

```Markdown
- id: 1
- name: A green door
- price: 12.50
- tags: home, green
```

...into this.

![image](https://cloud.githubusercontent.com/assets/95191/11047966/72b60254-8735-11e5-83eb-2f68720acd7f.png)

Please see the **[list of supported features →](./STATUS.md)**

### Preview

This application has been deployed to Heroku, **try it out at [attributes-kit.herokuapp.com](https://attributes-kit.herokuapp.com)**.

---

## Table of Contents

* [Getting Started](#getting-started)
* [Usage](#usage)
  * [API](#api)
  * [Browser](#browser)
  * [Server](#server)
* [Developing](#developing)
  * [Installation](#installation)
* [Compatibility](#compatibility)
* [Status](#status)
* [Versioning](#versioning)
* [Contributing](#testing)
* [Troubleshooting](#troubleshooting)
* [Code of Conduct](#code-of-conduct)
* [License](#license)

---

# Getting Started

1. **Clone the repository**

  ```bash
  git clone git@github.com:apiaryio/attributes-kit.git
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

4. **You're done!** :+1:

If you would like to use it in your application, please see the [Usage](#usage) section.

---

# Usage

* [Browser](#browser)
* [Server](#server)
* [API](#api)

## Browser

1. **Install the package**

  ```Bash
  npm install attributes-kit
  ```

2. **Require the package**

  ###### ES6

  ```JavaScript
  import AttributesKit from 'attributes-kit/dist/attributes-kit';
  ```

  ###### ES5

  ```JavaScript
  var AttributesKit = require('attributes-kit/dist/attributes-kit');
  ```

3. **Use it**

  Use the Attributes Kit, you can see the [API](#api).

### `<script>` tag

If you prefer to drop a `<script>` tag in your page, here's how to do it. Just a note—all builds do support [UMD](https://github.com/umdjs/umd) ([AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) and [CommonJS](http://wiki.commonjs.org/wiki/CommonJS)) out of the box.

1. **Choose the build**

  ###### **Download the latest release**

    Go to the [Releases](https://github.com/apiaryio/attributes-kit/releases) page and download the latest release, or you can download all the builds directly below.

  | Development Build       |
  |:------------------------|
  | [`attributes-kit.js`](https://npmcdn.com/attributes-kit/dist/attributes-kit.js); [`attributes-kit.js.map`](https://npmcdn.com/attributes-kit/dist/attributes-kit.js.map) |
  | Works out of the box, the uncompressed file is best used during development or debugging. `attributes-kit.js.map` is not required to run the Kit. |

  | Production Build        |
  |:------------------------|
  | [`attributes-kit.min.js`](https://npmcdn.com/attributes-kit/dist/attributes-kit.min.js) |
  | Works out of the box, compressed version saves bandwidth and improves performance in production. |


  ###### **Use CDN**

  | Development Build       |
  |:------------------------|
  | [`https://npmcdn.com/attributes-kit/dist/attributes-kit.js`](https://npmcdn.com/attributes-kit/dist/attributes-kit.js) |

  | Production Build       |
  |:------------------------|
  | [`https://npmcdn.com/attributes-kit/dist/attributes-kit.min.js`](https://npmcdn.com/attributes-kit/dist/attributes-kit.min.js) |

2. **Drop the `<script>` tag**

  ```HTML
  <script src="./attributes-kit.js"></script>
  ```

3. **Use it**

  ```JavaSript
  var AttributesKit = window.AttributesKit;
  AttributesKit.render(refractElement, element, options);
  ```

  Please see the [API](#api).

### Advanced

There are two more builds mainly for more advanced use cases.

| Build without React     |
|:------------------------|
| [`attributes-kit-no-react.js`](https://npmcdn.com/attributes-kit/dist/attributes-kit-no-react.js); [`attributes-kit-no-react.js.map`](https://npmcdn.com/attributes-kit/dist/attributes-kit-no-react.js.map) |
| This build *does not* contain React dependency. You have to install React manually, or your application lists React in its dependencies (in `package.json`). |

| Build without dependencies |
|:---------------------------|
| [`attributes-kit-no-deps.js`](https://npmcdn.com/attributes-kit/dist/attributes-kit-no-deps.js); [`attributes-kit-no-deps.js.map`](https://npmcdn.com/attributes-kit/dist/attributes-kit-no-deps.js.map) |
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
    element: [Refract Element]
  });

  ReactDomServer.renderToString(element);
  ```

## API

* [`render` Method](#render-method)
* [Class Instance](#class-instance)
* [React Component](#react-component)

#### `render` Method

```JavaScript
import AttributesKit from 'attributes-kit/dist/attributes-kit';

AttributesKit.render(refractElement, element, options);
```

#### Class Instance

```JavaScript
import AttributesKit from 'attributes-kit/dist/attributes-kit';

let attributes = new AttributesKit({element, options});
attributes.render(refractElement);
```

#### React Component

```JavaScript
import ReactDom from 'react-dom';
import {Attributes} from 'attributes-kit/dist/attributes-kit';

ReactDom.render(<Attributes element={refractElement} />, element);
```

### Parameters

Attributes Kit always takes the same parameters.

| Parameter | Description |
|:----------|:-----------|
| `refractElement` | [Refract](https://github.com/refractproject/refract-spec) element to be rendered. |
| `element` | A DOM node or a CSS selector; Attributes Kit will be rendered inside the element. |
| `options` | An options object to customize the rendering. |
| `options.dataStructures` | If set, these data structures will be used to dereference the `refractElement` being rendered. It should be a js array of refract elements. |

---

## Developing

### Installation

1. Clone the repository

  ```bash
  git clone git@github.com:apiaryio/attributes-kit.git
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

---

# Compatibility

| Package                 | Version |
|:------------------------|:--------|
| React | `0.14+` |
| React DOM | `0.14+` |
| Node | `0.10.40+` |
| NPM | `2.11+` |

### Browsers

| Browser                 | Version |
|:------------------------|:--------|
| Google Chrome | `15+` |
| Safari | `6.1+` |
| Firefox | `28+` |
| Edge | `12+` |
| IE | `11+` |
| Opera | `12.1+` |

---

# Status

Please see the [`STATUS.md`](./STATUS.md) file.

---

# Versioning

This repo is using [semantic-release](https://github.com/semantic-release/semantic-release).

---

# Contributing

Please see the [Contributions guidelines](./CONTRIBUTING.md).

---

# Code of Conduct

This project adheres to the [Open Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to honor this code.

---

# License

[MIT](./LICENSE.md).
