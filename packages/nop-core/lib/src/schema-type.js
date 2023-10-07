const schemaTypes = {};
export function registerSchemaType(typeName, schemaType) {
    schemaTypes[typeName] = schemaType;
}
export function getSchemaType(typeName) {
    return schemaTypes[typeName];
}
