import { Component } from "vue";
export type SchemaType = {
    componentType: Component;
    editorComponentType: Component;
    transformSchemaIn?(schema: any): any;
    transformSchemaOut?(schema: any): any;
};
export declare function registerSchemaType(typeName: string, schemaType: SchemaType): void;
export declare function getSchemaType(typeName: string): SchemaType;
