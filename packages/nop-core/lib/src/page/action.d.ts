import { BasePage } from "../core";
/**
 * 通过xui:import可以引入SystemJs格式的js模块，通过@action:xxx，@fn:(a,b)=>expr这种形式可以调用js模块中的函数
 *
 * 例如 {
 *    "xui:import": "a.lib"
 *    "page": {
 *       dialog: {
 *          "xui:import": "b.lib"
 *          api: "@action:a.f1"
 *       }
 *    }
 * }
 *
 * 上面的例子中@action:a.f1首先向上查找最近的xui:import引入的js库，如果没有找到，则继续向上查找直到顶层的节点。
 *
 * @action：xxx与 @fn:(a,b)=> expr的区别在于 @action:xxx对应函数名，@fn:(a,b)=>expr则是直接定义匿名函数实现
 *
 * @param json json schema
 */
export declare function bindActions(pageUrl: string, json: any, page: BasePage): Promise<void>;
