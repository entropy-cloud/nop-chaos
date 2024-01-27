import { VDomType } from "./lib"
import { RegisterPage } from "./page"


export type SchemaComponentProps = {
    schema: any,
    data: any,
    registerPage: RegisterPage,
    actions: Record<string, Function>
}

export type EditorComponentProps = {
    path: string,
    rollbackPageSource(path: string, silent?: boolean): Promise<any>

    getPageSource(path: string, silent?: boolean): Promise<any>,

    savePageSource(path: string, data: any, silent?: boolean): Promise<any>
}

export type SchemaProcessorType = {
    renderSchema(props: SchemaComponentProps): Promise<VDomType> | VDomType,
    renderEditor(props: EditorComponentProps, onExit: () => void): Promise<VDomType> | VDomType,

    transformSchemaIn?(schema: any): any
    transformSchemaOut?(schema: any): any
}

const schemaProcessorTypes: Record<string, SchemaProcessorType> = {}

export function registerSchemaProcessorType(typeName: string, schemaProcessorType: SchemaProcessorType) {
    schemaProcessorTypes[typeName] = schemaProcessorType
}

export function getSchemaProcessorType(typeName: string) {
    return schemaProcessorTypes[typeName]
}