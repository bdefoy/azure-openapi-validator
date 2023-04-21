# AvoidAdditionalProperties

## Category

ARM Error

## Applies to

ARM OpenAPI(swagger) specs

## Output Message

Additional Properties not allowed 

## Description

This rule checks for references having additional properties except for tags

## CreatedAt

April 21, 2023

## LastModifiedAt

April 21, 2023

## How to fix the violation

Remove the additionalProperties defined in the payload.

The following would be invalid:

```json
...
"properties": {
    "type": "object",
    "additionalProperties": {
        "type": "string"
    },
    "description": "Resource tags."
}
...
```
