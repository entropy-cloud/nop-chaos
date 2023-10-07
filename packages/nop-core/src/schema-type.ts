import { Component } from "vue";

export type SchemaType = {
    componentType: Component,
    editorComponentType: Component,
    transformSchemaIn?(schema:any):any
    transformSchemaOut?(schema:any):any
}

const schemaTypes: Record<string, SchemaType> = {}

export function registerSchemaType(typeName:string, schemaType: SchemaType){
    schemaTypes[typeName] = schemaType
}

export function getSchemaType(typeName:string){
    return schemaTypes[typeName]
}