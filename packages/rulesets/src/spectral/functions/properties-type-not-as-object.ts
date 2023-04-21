// If a property is defined with `'type': 'object'`, it must also define an object body.
// RPC Code: RPC-Policy-V1-03

export const propertiesTypeNotAsObject: any = (definitionObject: any, _opts: any, ctx: any) => {
  if (typeof definitionObject !== "object") {
    return []
  }

  if (definitionObject.type !== "object") {
    return []
  }

  const values = Object.values(definitionObject)

  for (let value in values) {
    if (typeof value === "object") {
      // check any child objects

      return [].concat(propertiesTypeNotAsObject(value, _opts, ctx))
    }
  }

  return [{ message: "", path: ctx.path }]
}
