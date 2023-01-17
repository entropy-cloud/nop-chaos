export type QueryBean = {
    offset?:number
    limit?:number
    cursor?:string
    filter?: TreeBean
    orderBy?: OrderFieldBean[]
    timeout?: number
}

export type OrderFieldBean = {
    name: string
    desc: boolean
    nullsFirst?: boolean
}

export type TreeBean = {
    $type: string
    $body?: any
    [name:string]:any
}