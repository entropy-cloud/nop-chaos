/**
 * 解析xui:js属性引入的js代码，并把返回的函数集合注册到全局的页面函数集合对象中。
 * 为了避免名字冲突，每个xui:js都处在独立的scope空间中。所有以@action:为前缀的action链接都是在父scope中查找对应的action。
 *
 * 例如 {
 *    "xui:js": "return {f1:function(){}}"
 *    "page": {
 *       dialog: {
 *          "xui:js": "return {f2: function(){}}"
 *          api: "@action:f1"
 *       }
 *    }
 * }
 *
 * 上面的例子中@action:f1首先向上查找最近的xui:js，如果没有找到，则继续向上查找直到顶层的节点。
 * 具体实现方法是通过预处理为每个xui:js分配一个scope，然后把前缀为 @action:的字符串都替换为 @scoped-action:scope1/scope2|originalAction这种形式
 *
 * @param json json schema
 * @param actions 页面action集合
 * @fnScope 为函数名字空间
 * @amisScope 为状态变量名字空间，对应于amis中store构成的store tree
 */
export declare function collectActions(pageUrl: string, json: any, fnScope: string, amisScope: string, actions: Record<string, any>): Promise<void>;
