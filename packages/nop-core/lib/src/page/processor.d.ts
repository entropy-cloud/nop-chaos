/**
 * 如果返回undefined，表示该节点需要被删除
 */
export type XuiDirectiveProcessor = (type: string, // 类型信息
json: any, // 节点数据
processProps: (json: any) => any) => any;
/**
 * 查找所有具有typeProp指定的属性的节点，并调用processor进行处理，返回结果将会替换原节点。
 * 例如识别xui:roles属性，自动删除没有对应权限的节点
 *
 * @param json json对象
 * @param typeProp 类型字段名
 * @param processor 处理器
 * @returns 经过处理替换后得到的节点
 */
export declare function processXuiDirective(json: any, typeProp: string, processor: XuiDirectiveProcessor): Promise<any>;
export type XuiValueProcessor = (value: string, key: any, o: any) => any;
/**
 * 对json对象中的字符串值调用processor来处理
 * @param json 待处理的对象
 * @param processor 处理器
 * @returns
 */
export declare function processXuiValue(json: any, processor: XuiValueProcessor): any;
