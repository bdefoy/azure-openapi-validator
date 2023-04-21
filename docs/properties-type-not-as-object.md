# PropertiesTypeNotAsObject

## Category

ARM Error

## Applies to

ARM OpenAPI(swagger) specs

## Output Message

Properties type should not be object, specify any primitive type

## Description

This rule checks for references that aren't primitives as thier Properties type

## CreatedAt

April 18, 2023

## LastModifiedAt

April 18, 2023

## How to fix the violation

Add the correct definition of the properties type in the payload.

The following would be invalid:

```json
...
"properties": {
    "info": {
        "readOnly": true,
        "type": "object",
        "description": "The additional info."
    }
}
...
```
