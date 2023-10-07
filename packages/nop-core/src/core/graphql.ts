import { isArray, isPlainObject, isString } from "@vue/shared"
import { AxiosRequestConfig } from 'axios'
import { isBoolean, isInteger, isNumber } from "lodash-es"
import { FetcherRequest } from "./types"
import type { OrderFieldBean, QueryBean, TreeBean } from "./types"
import { splitPrefixUrl } from "../page"


export type OperationType = "query" | "mutation" | "subscription"

export type OperationDefinition = {
    arguments: ArgumentDefinition[]
}

export type ArgumentDefinition = {
    name: string
    type: string
    builder?: (data: any, arg: ArgumentDefinition, options: FetcherRequest) => any
}

export function handleGraphQL(config: AxiosRequestConfig<any>, graphqlUrl: string, options: FetcherRequest) {
    let url = config.url!
    const [type,path] = splitPrefixUrl(url) || []
    if (type == 'query' || type == 'mutation' || type == 'subscription') {
        normalizeData(config)
        config.method = 'post'
        handleGraphQLUrl(type, path, config, graphqlUrl, options)
        return true
    } else if (url.endsWith("/graphql") || url.indexOf("/graphql?") >= 0) {
        normalizeData(config)
        config.transformResponse = transformGraphQLResponse
        config.method = 'post'
        return true
    } else {
        return false
    }
}


function transformGraphQLResponse(data: any) {
    // console.info("graphql response",data)
    data = JSON.parse(data)

    // status/msg/data是amis的要求。 message/result/code/success是jceeboot前端框架的要求
    if (data.errors?.length > 0) {
        data.status = parseInt(data.extensions?.['nop-status'] || -1)
        data.msg = data.errors[0].message
    } else {
        data.status = 0
        data.msg = data.extensions?.['nop-msg'];
    }
    return data
}

function handleGraphQLUrl(opType: OperationType, url: string,
    config: AxiosRequestConfig<any>, graphql: string, options: FetcherRequest) {

    let pos = url.indexOf('?')
    if (pos > 0) {
        url = url.substring(0, pos)
    }

    let pos2 = url.indexOf('/')

    const action = pos2 > 0 ? url.substring(0, pos2) : url
    let selection = pos2 > 0 ? url.substring(pos2 + 1) : undefined
    if (selection) {
        selection = selection.replaceAll('%20', ' ');
        selection = selection.replaceAll('%0A', '\n');
    }
    if (!selection) {
        selection = options['gql:selection']
    }

    let stdAction = action
    // 例如NopAuthUser__findPage或者NopAuthUser__admin_findPage，返回方法名findPage
    let pos3 = action.lastIndexOf('_')
    if (pos3 > 0) {
        stdAction = action.substring(pos3 + 1)
    }

    let data = config.data || {}

    //@hack 针对AMIS的picker控件做特殊处理。picker控件的source会在初始化时作为loadOptions函数被调用
    if (stdAction === 'findPage') {
        if (data.op === 'loadOptions') {
            const values = toArray(data.value, options.delimiter)
            data = {
                ['filter_' + options.valueField! + '__in']: values
            }
            selection = "items{" + (options.valueField || 'id') + ',' + (options.labelField || 'id') + "}"
        }
    }

    let def = operationRegistry[stdAction]
    if (!def) {
        def = guessDefinition(config.data)
    }

    // 对于__findPage等调用，除了预定义的query等参数之外，可以通过v_XXX这种参数名来增加额外的参数
    let args = [...def.arguments, ...guessExtArgDefinitions(config.data)]

    let query = opType + ' ' + action
    if (args.length > 0) {
        query += '('
        query += args.map(arg => '$' + arg.name + ':' + arg.type).join(',')
        query += ')'
    }
    query += '{\n'
    query += action + '(';
    if (args.length > 0) {
        query += args.map(arg => arg.name + ':' + '$' + arg.name).join(',')
    }
    query += ')'
    if (selection) {
        query += '{\n'
        query += selection
        query += '\n}'
    }
    query += '\n}'

    const variables: Record<string, any> = {}
    args.forEach(arg => {
        const builder = arg.builder || defaultArgBuilders[arg.type] || argValue
        variables[arg.name] = builder(data, arg, options)
    })

    config.transformResponse = [transformGraphQLResponse, res => {
        res.data && (res.data = res.data[action])
        return res
    }]

    config.method = 'post'
    config.url = graphql
    config.data = {
        query,
        variables
    }
}

function toArray(value: any, delimiter?: string) {
    if (isString(value)) {
        value = value.split(delimiter || ',')
    }
    return value
}

function normalizeData(config: AxiosRequestConfig) {
    const { data, params } = splitData(config.params)
    config.data = { ...filterData(config.data), ...data }
    config.params = params
}

function filterData(data: any) {
    if (!data)
        return {}
    const ret: any = {}
    for (let k in data) {
        if (k.startsWith("__"))
            continue
        ret[k] = data[k]
    }
    return ret
}

function splitData(data: any) {
    if (!data) {
        return {}
    }

    const body: any = {}
    const params: any = {}

    for (let k in data) {
        // 以__为前缀的变量不提交到后台
        if (k.startsWith("__"))
            continue

        if (k.charAt(0) == '@' || k.charAt(0) == '_') {
            params[k] = data[k]
        } else {
            body[k] = data[k]
        }
    }
    return {
        data: body,
        params
    }
}

function guessDefinition(data: any): OperationDefinition {
    let args: ArgumentDefinition[] = []
    if (data) {
        for (let k in data) {
            if (isSpecialVarName(k))
                continue
            args.push({ name: k, type: guessType(data[k]) })
        }
    }
    return { arguments: args }
}

function guessExtArgDefinitions(data: any): ArgumentDefinition[] {
    let args: ArgumentDefinition[] = []
    if (data) {
        for (let k in data) {
            if (k.startsWith("v_")) {
                args.push({ name: k, type: guessType(data[k]) })
            }
        }
    }
    return args
}

function isSpecialVarName(name: string) {
    return name.startsWith("__") || name.startsWith("@") || name.startsWith("v_");
}

function guessType(value: any) {
    if (isString(value))
        return "String"
    if (isNumber(value)) {
        if (isInteger(value))
            return "Int"
        return "Float"
    }
    if (isBoolean(value))
        return "Boolean"

    if (isPlainObject(value))
        return "Map"
    if (isArray(value))
        return "[String]"
    return "String"
}


export function registerOperation(name: string, op: OperationDefinition) {
    operationRegistry[name] = op
}

/**
 * 缺省注册了CRUD操作所对应的GraphQL类型
 */
const operationRegistry: Record<string, OperationDefinition> = {
    get: {
        //  operation: 'query',
        arguments: [
            {
                name: "id",
                type: "String",
                builder: argString,
            },
            {
                name: "ignoreUnknown",
                type: "Boolean",
                builder: argBoolean
            }
        ]
    },
    findPage: {
        //  operation: 'query',
        arguments: [
            {
                name: 'query',
                type: 'QueryBeanInput',
                builder: argQuery
            }
        ]
    },

    findList: {
        //  operation: 'query',
        arguments: [
            {
                name: 'query',
                type: 'QueryBeanInput',
                builder: argQuery
            }
        ]
    },

    findFirst: {
        //  operation: 'query',
        arguments: [
            {
                name: 'query',
                type: 'QueryBeanInput',
                builder: argQuery
            }
        ]
    },

    update: {
        //  operation: 'mutation',
        arguments: [
            {
                name: 'data',
                type: 'Map',
                builder: argDataMap
            }
        ]
    },

    save: {
        // operation: 'mutation',
        arguments: [
            {
                name: 'data',
                type: 'Map',
                builder: argDataMap
            }
        ]
    },

    saveOrUpdate: {
        // operation: 'mutation',
        arguments: [
            {
                name: 'data',
                type: 'Map',
                builder: argDataMap
            }
        ]
    },

    upsert: {
        // operation: 'mutation',
        arguments: [
            {
                name: 'data',
                type: 'Map',
                builder: argDataMap
            }
        ]
    },

    copyForNew: {
        // operation: 'mutation',
        arguments: [
            {
                name: 'data',
                type: 'Map',
                builder: argDataMap
            }
        ]
    },

    delete: {
        // operation: 'mutation',
        arguments: [
            {
                name: "id",
                type: "String",
                builder: argString
            }
        ]
    },

    batchGet: {
        arguments: [
            {
                name: "ids",
                type: "[String]",
                builder: argStringList
            }
        ]
    },

    batchDelete: {
        // operation: 'mutation',
        arguments: [
            {
                name: "ids",
                type: "[String]",
                builder: argStringList
            }
        ]
    },

    batchModify: {
        // operation: 'mutation',
        arguments: [
            {
                name: "data",
                type: "[Map]",
                builder: argMapList
            },
            {
                name: "delIds",
                type: "[String]",
                builder: argStringList
            }
        ]
    }
}

const defaultArgBuilders: Record<string, any> = {
    "String": argString,
    "Boolean": argBoolean,
    "Int": argInt,
    "Float": argFloat,
    "Map": argMap,
    "[String]": argStringList,
    "[Map]": argMapList,
    "QueryBeanInput": argQuery,
}

function argString(data: any, arg: ArgumentDefinition) {
    let v = data[arg.name]
    if (v == null)
        return null
    return String(v)
}

function argBoolean(data: any, arg: ArgumentDefinition) {
    let v = data[arg.name]
    if (v == null)
        return null
    if (v == 'false' || v == 'n' || v == '0' || v == 'N')
        return false
    return !!v
}

function argInt(data: any, arg: ArgumentDefinition) {
    let v = data[arg.name]
    if (v == null)
        return null
    return parseInt(v, 10)
}

function argFloat(data: any, arg: ArgumentDefinition) {
    let v = data[arg.name]
    if (v == null)
        return null
    return parseFloat(v)
}

/**
 * 通过 filter_XX__ge=3来表达 <ge name="XX" value="3" />这种过滤条件
 */
function argQuery(data: any, arg: ArgumentDefinition, options: FetcherRequest) {
    let query: QueryBean = {}
    query.limit = data.limit ?? data.pageSize ?? data.perPage ?? 0
    query.offset = data.offset ?? (query.limit! * ((data.page || 0) - 1))
    query.orderBy = toOrderBy(data.orderBy ?? data.orderField, data.orderDir)
    query.filter = toFilter(data)
    query.cursor = data.cursor
    query.timeout = data.timeout

    return query

    function toOrderBy(v: any, orderDir: any) {
        if (v == null)
            return
        if (isString(v)) {
            if (v.length == 0)
                return
            // 字典表显示时会替换成label字段。例如status在列表上实际显示status_label，排序需要按照status进行
            if (v.endsWith("_label"))
                v = v.substring(0, v.length - "_label".length)
            return [{ name: v, desc: orderDir == 'desc' }]
        }
        if (isArray(v))
            return v as OrderFieldBean[]
        return [v as OrderFieldBean]
    }

    function toFilter(data: any) {
        let filter: TreeBean = {
            "$type": "and",
            "$body": []
        }
        for (let k in data) {
            if (k.startsWith("filter_")) {
                let [name, op] = k.substring("filter_".length).split("__")
                op = op || 'eq'
                let value = data[k]

                // 不提交空的查询条件                
                if (value == null || value == '')
                    continue;

                // 如果传入字符串__empty，则实际提交的是空字符串
                if (value == '__empty') {
                    value = '';
                } else if (value == '__null') {
                    value = null;
                }

                let min = undefined
                let max = undefined

                if (op.startsWith("between") && value != null) {
                    let ary = toArray(value)
                    min = ary[0]
                    max = ary[1]
                    value = undefined
                }
                filter.$body.push({ '$type': op, name, value, min, max })
            }
        }

        if (options.filter) {
            if (options.filter.$type == 'and' || options.filter.$type == '_' || options.filter.$type == 'filter') {
                filter.$body = filter.$body.concat(options.filter.$body || [])
            } else {
                filter.$body.push(options.filter)
            }
        }

        if (filter.$body.length == 0)
            return
        return filter
    }
}

function argDataMap(data: any, arg: ArgumentDefinition) {
    if (data == null)
        return null
    let ret: any = {}
    for (let k in data) {
        if (isSpecialVarName(k))
            continue
        ret[k] = data[k]
    }
    return ret
}

function argMap(data: any, arg: ArgumentDefinition) {
    return data[arg.name]
}

function argStringList(data: any, arg: ArgumentDefinition) {
    let v = data[arg.name]
    if (v == null)
        return null
    if (isString(v))
        return v.split(',')
    return v
}

function argMapList(data: any, arg: ArgumentDefinition) {
    return data[arg.name]
}

function argValue(data: any, arg: ArgumentDefinition) {
    return data[arg.name]
}