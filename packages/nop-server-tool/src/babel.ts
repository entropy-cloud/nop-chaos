import {transform} from '@babel/standalone'
import dynamicImport from "@babel/plugin-syntax-dynamic-import"
import transformSystemJs from "@babel/plugin-transform-modules-systemjs"

export function babelTransform(path:string, code:string){
    return transform(code, {
        plugins:[
            dynamicImport,
            transformSystemJs,
        ]
    })
}