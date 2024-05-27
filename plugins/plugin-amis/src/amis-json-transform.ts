export function transformSchemaToStdAmis(json:any){
    if(json.type == 'page' && json.body && json.body.type != 'nop-page-scope'){
        const body = json.body
        const pageScope = {
            type : 'nop-page-scope',
            body: body
        }
        return { ...json, body: pageScope}
    }
    return json
}

export function transformSchemaFromStdAmis(json:any){
    const body = json.body
    if(body?.type == 'nop-page-scope'){
        json.body = body.body
    }
    return json
} 