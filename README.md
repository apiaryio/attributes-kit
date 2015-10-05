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
  * [Installation](#installation)
  * [API](#api)
  * [Browser Builds](#browser-builds)
  * [Custom Builds](#custom-builds)
* [Developing](#developing)
  * [Pre-Installation Check](#developing)
  * [Installation](#developing)
  * [Playground](#testing)
  * [Testing](#testing)
* [Versioning](#versioning)
* [Contributing](#testing)
* [Troubleshooting](#testing)
* [Code of Conduct](#code-of-conduct)
* [License](#testing)

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
  import AttributesKit from 'AttributesKit';
  let attributes = new AttributesKit({element, options});
  attributes.render(data);
  ```

  Or you can use the React component directly.

  ```JavaScript
  import {AttributesKit} from 'AttributesKit';

  // E.g. <AttributesKit data={data} />
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


---

# Usage

## Installation

```
npm install attributes-kit
```

## API

### Using the static method

```javascript
import AttributesKit from 'AttributesKit';
AttributesKit.render(data, element, options);
```

### Using the class instance

```javascript
import AttributesKit from 'AttributesKit';
let attributes = new AttributesKit({element, options});
attributes.render(data);
```

### Using the React component directly

```javascript
import AttributesKit from 'AttributesKit';
import React from 'react';
React.render(<Attributes.AttributesKit data={data} />, this.element);
```

### Parameters

Even if in different forms, `attributes-kit` will always take the same parameters

- `data` - A valid [Refract](https://github.com/refractproject/refract-spec) element to be rendered.
- `element` - A DOM node where the rendered MSON will be placed.
- `options` - An options object that will drive MSON rendering (unused for now).

## Browser

You can still `npm install attributes-kit` and use the package in the browser; with [Webpack](http://webpack.github.io/) it's a piece of cake.

If you prefer to drop a `<script>` tag in your page, here's a list of browser builds that you can use. All builds do support [UMD](https://github.com/umdjs/umd) ([AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) and [CommonJS](http://wiki.commonjs.org/wiki/CommonJS)) out of the box; there are both uncompressed and compressed versions, the compressed one comes with a source map file.

| Uncompressed            |
|:------------------------|
| [`attributes-kit.js`]() |
| The uncompressed file is best used during development or debugging. |

| Compressed                   |
|:-----------------------------|
| [`attributes-kit.min.js`](); [`attributes-kit.min.map`]() |
| Compressed version saves bandwidth and improves performance in production. Source map, the file is not required to run the Kit. |

In case you would like to build your own version of the Attributes Kit, please see the [Custom Builds](#custom-builds) section.

### Custom Builds

`attributes-kit` can be imported into your project in different ways, depending on your bundling system and other things (such as power surges, cosmic radiations, tides, economic trend, weather situation, metro delays, planets alignment and so on.)

Actually, the default scenario is **importing** the source code. It means that, in order to be used, you're kind of forced to use **Webpack** as module loader and import into hosting application some loaders that can be found into [package.json](./package.json) file, `devDependencies`.

A definitely better idea is

```javascript
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

