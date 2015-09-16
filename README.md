# Attributes Kit [![Circle CI](circleci-badge)](circleci)

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

## Table of Contents

* [Getting Started](#getting-started)
* [Compatibility](#compatibility)
* [Usage](#usage)
  * [Installation](#installation)
  * [Browser Builds](#browser-builds)
  * [Custom Builds](#custom-builds)
* [Developing](#developing)
  * [Pre-Installation Check](#developing)
  * [Installation](#developing)
  * [Playground](#testing)
  * [Testing](#testing)
* [Contributing](#testing)
* [Troubleshooting](#testing)
* [License](#testing)

---

# Getting Started



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

### Browser

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

`npm build`

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

# Contributing

---

# Troubleshooting

---

# License


[circleci-badge]: https://img.shields.io/circleci/token/b2737c94f42fff64565fe49cf0bd5d776f091bdd/project/apiaryio/attributes-kit/master.svg
[circleci]: https://circleci.com/gh/apiaryio/attributes-kit
