import { Component } from "vue";

export type SchemaProcessorType = {
    componentType: Component,
    editorComponentType: Component,
    transformSchemaIn?(schema:any):any
    transformSchemaOut?(schema:any):any
}

const schemaProcessorTypes: Record<string, SchemaProcessorType> = {}

export function registerSchemaProcessorType(typeName:string, schemaProcessorType: SchemaProcessorType){
    schemaProcessorTypes[typeName] = schemaProcessorType
}

export function getSchemaProcessorType(typeName:string){
    return schemaProcessorTypes[typeName]
}