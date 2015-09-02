# Attributes Component

## Top Level Components

* `ResourceAttributesComponent`
* `ActionAttributesComponent`
* `PayloadAttributesComponent`

Each component has its own style sheet, e.g. `ResourceAttributesComponent` has `resourceAttributes.styl` (or `*.css`); if you want to override the default style sheets, that's the place.

Reason for having these components is to apply a different theme, e.g. have a different visual rendering of the `Attributes` component.

Another reason is to render additional title, or description.

---

## Components

### `AttributesComponent`

It has some default styles which goes with the component.

Title “Attributes”.

Take `content[0]` and pass it down to the `AttributeComponent`.

### `AttributeComponent`

Decides based on `element` whether to render object, or an array.

### `ObjectComponent` + `ObjectMemberComponent`

### `ArrayComponent` + `ArrayItemComponent`


---


### `KeyComponent`

Input: Refract Element (e.g. Member Element).

```json
{
    "element": "member",
    "content": {
        "key": {
            "element": "string",
            "content": "id"
        },
        "value": {
            "element": "string",
            "content": "42"
        }
    }
}
```

### `ValueComponent`
### `DescriptionComponent`
### `RequirementComponent`
### `TypeComponent`
### `DefaultComponent`
### `SamplesComponent`



---

# Playground

## How set it up

+ Clone repository

        $ git clone git@github.com:apiaryio/attributes-component.git

+ Install drafter

        $ git clone git@github.com:apiaryio/protagonist.git
        $ cd protagonist
        $ git checkout shared/refract
        $ git submodule update --init --recursive
        $ npm install

+ Install dependencies

        npm install
        npm run develop

+ Run it

        npm run develop
---


# TO DO

* Event Handlers (e.g. when I click on a reference)?
* Attributes as an array?
* Attributes as primitive type, e.g. string?
