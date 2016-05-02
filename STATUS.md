# Status

|       | Stable Channel | Beta Channel    |
|:------|:---------------|:----------------|
| NPM   | `0.17.0`       | `0.18.0-beta.6` |
| [Apiary](https://apiary.io) | `0.17` | `0.18.0-beta.6` |

This table indicates what's the _latest version of the Attributes Kit available in the NPM Registry_ and what's the _latest version that has been deployed_ to [Apiary](https://apiary.io).

#### Agenda

|    | Description         |
|:---|:--------------------|
| :red_circle: | Not Supported |
| :large_blue_circle: | Partially Supported |
| :white_check_mark: | Supported |

### MSON Features

A list of supported/unsupported features according to the [MSON Specification](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md).

#### 2 Types

|    | Feature             |
|:---|:--------------------|
| :white_check_mark: | [2.1 Base Types → 2.1.1 Primitive Types](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#211-primitive-types) |
| :white_check_mark: | [2.1 Base Types → 2.1.2 Structure Types → Array](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#212-structure-types) |
| :white_check_mark: | [2.1 Base Types → 2.1.2 Structure Types → Object](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#212-structure-types) |
| :white_check_mark: | [2.1 Base Types → 2.1.2 Structure Types → Enum](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#212-structure-types) |
| :red_circle: | [2.2 Named Types](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#22-named-types) |
| :white_check_mark: | [2.3 Member Types → 2.3.1 Property Member Types](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#231-property-member-types) |
| :white_check_mark: | [2.3 Member Types → 2.3.2 Value Member Types](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#232-value-member-types) |

#### 3 Type Declaration

|    | Feature             |
|:---|:--------------------|
| :red_circle: | [3.1 Named Declaration](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#31-named-declaration) |
| :red_circle: | [3.1 Named Declaration → 3.1.1 Generic Named Declaration](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#311-generic-named-declaration) |
| :red_circle: | [3.2 Property Member Declaration → 3.2.1 Property Name](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#321-property-name) |
| :red_circle: | [3.2 Property Member Declaration → 3.2.2 Variable Property Name](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#322-variable-property-name) |
| :white_check_mark: | [3.3 Value Member Declaration](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#33-value-member-declaration) |
| :white_check_mark: | [3.4 Value Definition](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#34-value-definition) |
| :red_circle: | [3.4 Value Definition → 3.4.3 Variable Value](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#343-variable-value) |

#### 3.5 Type Definition

|    | Feature             |
|:---|:--------------------|
| :white_check_mark: | [3.5.1 Type Specification](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#351-type-specification) |
| :white_check_mark: | [3.5.1 Type Specification → 3.5.1.1 Variable Type Specification](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#3511-variable-type-specification) |
| :red_circle: | [3.5.2 Type Name](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#352-type-name) |
| :red_circle: | [3.5.2 Type Name → 3.5.2.1 Variable Type Name](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#3521-variable-type-name) |
| :red_circle: | [3.5.2 Type Name → 3.5.2.2 Wildcard Type Name](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#3522-wildcard-type-name) |
| :white_check_mark: | [3.5.3 Type Attribute → Required](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#353-type-attribute) |
| :white_check_mark: | [3.5.3 Type Attribute → Optional](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#353-type-attribute) |
| :red_circle: | [3.5.3 Type Attribute → Fixed](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#353-type-attribute) |
| :red_circle: | [3.5.3 Type Attribute → Nullable](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#353-type-attribute) |
| :white_check_mark: | [3.5.3 Type Attribute → Sample](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#353-type-attribute) |
| :white_check_mark: | [3.5.3 Type Attribute → Default](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#353-type-attribute) |

#### 3.6 Description

|    | Feature             |
|:---|:--------------------|
| :white_check_mark: | [3.6 Description](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#36-description) |

#### 4 Type Sections

|    | Feature             |
|:---|:--------------------|
| :large_blue_circle: | [4.1 Block Description](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#41-block-description) |
| :white_check_mark: | [4.2 Member Type Group](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#42-member-type-group) |
| :white_check_mark: | [4.3 Nested Member Types](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#43-nested-member-types) |
| :white_check_mark: | [4.4 Sample](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#44-sample) |
| :white_check_mark: | [4.5 Default](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#45-default) |

#### 5 Type Inheritance

|    | Feature             |
|:---|:--------------------|
| :white_check_mark: | [5.1 Mixin Type](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#51-mixin-type) |
| :white_check_mark: | [5.2 One Of Type](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#52-one-of-type) |
| :red_circle: | [5.3 Generic Named Type](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#53-generic-named-type) |
| :red_circle: | [5.4 Member Type Precedence](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md#54-member-type-precedence) |


#### Other

|    | Feature             |
|:---|:--------------------|
| :white_check_mark: | [Data Structures](https://github.com/apiaryio/api-blueprint/blob/master/API%20Blueprint%20Specification.md#data-structures-section) |

### Kit Features

A list of supported/unsupported features in relation purely to the Kit.

|    | Feature             | Status       |
|:---|:--------------------|:-------------|
| :white_check_mark: | Server Build | _**Supported**_ |
| :white_check_mark: | Browser Build | _**Supported**_ |
| :red_circle:| Custom Themes | _**In  Progress**_ |
| :red_circle:| Events | _**In  Progress**_ |
