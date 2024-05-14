export function transformSchemaToStdAmis(json:any){
    if(json.type == 'page'){
        const body = json.body
        const pageScope = {
            type : 'nop-page-scope',
            body: body
        }
        json.body = pageScope
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