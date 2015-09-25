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

Please see the **[list of supported features →](#mson-features)**

---

## Table of Contents

* [Getting Started](#getting-started)
* [Status](#status)
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

# Status

#### Agenda

|    | Description         |
|:---|:--------------------|
| :red_circle: | Not Supported |
| :large_blue_circle: | Partially Supported |
| :white_check_mark: | Supported |

### MSON Features

A list of supported/unsupported features according to the [MSON Specification](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md).

#### 2 Types

|    | Feature             | Issue |
|:---|:--------------------|:------|
| :white_check_mark: | [2.1 Base Types → 2.1.1 Primitive Types](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#211-primitive-types) | |
| :white_check_mark: | [2.1 Base Types → 2.1.2 Structure Types → Array](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#212-structure-types) | [#2](https://github.com/apiaryio/attributes-kit/pull/2) |
| :white_check_mark: | [2.1 Base Types → 2.1.2 Structure Types → Object](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#212-structure-types) | [#1](https://github.com/apiaryio/attributes-kit/pull/1) |
| :red_circle: | [2.1 Base Types → 2.1.2 Structure Types → Enum](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#212-structure-types) | [#53](https://github.com/apiaryio/attributes-kit/issues/53) |
| :red_circle: | [2.2 Named Types](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#22-named-types) | [#79](https://github.com/apiaryio/attributes-kit/issues/79) |
| :white_check_mark: | [2.3 Member Types → 2.3.1 Property Member Types](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#231-property-member-types) | |
| :white_check_mark: | [2.3 Member Types → 2.3.2 Value Member Types](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#232-value-member-types) | |

#### 3 Type Declaration

|    | Feature             | Issue |
|:---|:--------------------|:------|
| :red_circle: | [3.1 Named Declaration](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#31-named-declaration) | [#81](https://github.com/apiaryio/attributes-kit/issues/81) |
| :red_circle: | [3.1 Named Declaration → 3.1.1 Generic Named Declaration](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#311-generic-named-declaration) | [#82](https://github.com/apiaryio/attributes-kit/issues/82) |
| :red_circle: | [3.2 Property Member Declaration → 3.2.1 Property Name](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#321-property-name) | |
| :red_circle: | [3.2 Property Member Declaration → 3.2.2 Variable Property Name](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#322-variable-property-name) | |
| :white_check_mark: | [3.3 Value Member Declaration](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#33-value-member-declaration) | |
| :white_check_mark: | [3.4 Value Definition](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#34-value-definition) | |
| :red_circle: | [3.4 Value Definition → 3.4.3 Variable Value](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#343-variable-value) | |

#### 3.5 Type Definition

|    | Feature             | Issue |
|:---|:--------------------|:------|
| :white_check_mark: | [3.5.1 Type Specification](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#351-type-specification) | |
| :white_check_mark: | [3.5.1 Type Specification → 3.5.1.1 Variable Type Specification](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#3511-variable-type-specification) | |
| :red_circle: | [3.5.2 Type Name](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#352-type-name) | |
| :red_circle: | [3.5.2 Type Name → 3.5.2.1 Variable Type Name](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#3521-variable-type-name) | |
| :red_circle: | [3.5.2 Type Name → 3.5.2.2 Wildcard Type Name](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#3522-wildcard-type-name) | |
| :white_check_mark: | [3.5.3 Type Attribute → Required](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#353-type-attribute) | |
| :white_check_mark: | [3.5.3 Type Attribute → Optional](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#353-type-attribute) | |
| :red_circle: | [3.5.3 Type Attribute → Fixed](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#353-type-attribute) | |
| :white_check_mark: | [3.5.3 Type Attribute → Sample](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#353-type-attribute) | |
| :white_check_mark: | [3.5.3 Type Attribute → Default](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#353-type-attribute) | |

#### 3.6 Description

|    | Feature             | Issue |
|:---|:--------------------|:------|
| :white_check_mark: | [3.6 Description](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#36-description) | |

#### 4 Type Sections

|    | Feature             | Issue |
|:---|:--------------------|:------|
| :large_blue_circle: | [4.1 Block Description](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#41-block-description) | |
| :white_check_mark: | [4.2 Member Type Group](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#42-member-type-group) | |
| :white_check_mark: | [4.3 Nested Member Types](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#43-nested-member-types) | |
| :white_check_mark: | [4.4 Sample](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#44-sample) | |
| :white_check_mark: | [4.5 Default](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#45-default) | |

#### 5 Type Inheritance

|    | Feature             | Issue |
|:---|:--------------------|:------|
| :red_circle: | [5.1 Mixin Type](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#51-mixin-type) | [#77](https://github.com/apiaryio/attributes-kit/issues/77) |
| :red_circle: | [5.2 One Of Type](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#52-one-of-type) | [#78](https://github.com/apiaryio/attributes-kit/issues/78) |
| :red_circle: | [5.3 Generic Named Type](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#53-generic-named-type) | |
| :red_circle: | [5.4 Member Type Precedence](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#54-member-type-precedence) | |


#### Other

|    | Feature             | Issue |
|:---|:--------------------|:------|
| :red_circle: | [Data Structures](https://github.com/apiaryio/api-blueprint/blob/master/API%20Blueprint%20Specification.md#data-structures-section) | [#80](https://github.com/apiaryio/attributes-kit/issues/80) |

### Kit Features

A list of supported/unsupported features in relation purely to the Kit.

|    | Feature             | Status       | Issue |
|:---|:--------------------|:-------------|:------|
| :white_check_mark: | Server Build | _**Supported**_ | [#59](https://github.com/apiaryio/attributes-kit/pull/59) |
| :white_check_mark: | Browser Build | _**Supported**_ | [#10](https://github.com/apiaryio/attributes-kit/issues/10) |
| :red_circle:| Custom Themes | _**In  Progress**_ | [#12](https://github.com/apiaryio/attributes-kit/issues/12) |
| :red_circle:| Events | _**In  Progress**_ | [#15](https://github.com/apiaryio/attributes-kit/issues/15) |

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
