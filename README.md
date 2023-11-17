# Nop Chaos (Nop Platform 2.0的前端部分)

#### 介绍

Nop Platform 2.0是基于可逆计算原理从零开始构建的新一代低代码平台，它致力于克服低代码平台无法摆脱穷举法的困境，从理论层面超越组件技术，有效的解决粗粒度软件复用的问题。nop-chaos是Nop平台的前端部分，基于Vue3.0、ant-design-vue、百度AMIS、logicflow、xspreadsheet等技术实现。

nop-chaos与[nop-entropy（Nop平台的后端部分）](https://gitee.com/canonical-entropy/nop-entropy)相结合，可以形成类似[百度爱速搭](https://aisuda.baidu.com/)的完整解决方案。nop-chaos是一个通用的前端低代码运行容器，它打包之后可以直接嵌入到后端的Java服务中。**在一般的业务开发中，只需要在Java端增加JSON文件和一些简单的js脚本库即可，并不需要重新编译打包nop-chaos项目**。

nop-chaos目前主要使用[百度AMIS框架](https://github.com/baidu/amis)来渲染后端返回的低代码页面，但是它的设计本身是通用的，大量操作都是在与框架无关的JSON结构层面完成，可以很容易的适配其他低代码引擎。后期考虑会增加对[阿里LowCodeEngine](https://github.com/alibaba/lowcode-engine)低代码引擎的适配。

#### 设计原理

[可逆计算：下一代软件构造理论](https://zhuanlan.zhihu.com/p/64004026)

[可逆计算的技术实现](https://zhuanlan.zhihu.com/p/163852896)

[从张量积看低代码平台的设计](https://zhuanlan.zhihu.com/p/531474176)

[低代码平台需要什么样的ORM引擎？](https://zhuanlan.zhihu.com/p/543252423)

[为什么百度AMIS是一个优秀的设计](https://zhuanlan.zhihu.com/p/599773955)

#### 软件架构

nop-chaos采用pnpm多模块管理，具有如下模块：

1. nop-site:  前端程序主框架以及对AMIS框架的集成。其中主框架是基于[jeecgboot-vue3](https://gitee.com/jeecg/jeecgboot-vue3)和[vben-admin](https://doc.vvbin.cn/guide/introduction)项目进行改造。nop-site对AMIS进行了一定的封装和增强，内部使用SystemJs来动态加载js模块（主要代码均在src/nop目录下）。

2. nop-server-tool: 在服务端通过rollup对js库进行转换打包的工具。它负责将ESM模块文件翻译为SystemJs模块标准的js文件。这一模块主要是嵌入在后端Java程序中执行。

3. nop-amis-editor: 对amis-editor的简单封装，可以嵌入在iframe中独立使用

4. 其他模块为目前正在考虑集成的相关技术，尚未包含实际内容

#### 安装与使用

- 如果没有安装 Node.js 16，下载地址：<https://nodejs.org>

```bash
# 验证
node -v
```

- 如果没有安装 pnpm 执行安装

```bash
npm i -g pnpm
# 验证
pnpm -v
```

- 获取代码

```bash
git clone https://gitee.com/canonical-entropy/nop-chaos.git
cd nop-chaos
```

注意：不要放到中文或带空格的目录下。

- 安装依赖

```bash
pnpm config set registry https://registry.npm.taobao.org
pnpm config set ENTRYCLI_CDNURL=https://cdn.npm.taobao.org/dist/sentry-cli
pnpm config set sentrycli_cdnurl=https://cdn.npm.taobao.org/dist/sentry-cli

pnpm install
```

- 开发调试

```bash
pnpm dev
```

初次执行速度会很慢，需要耐心等待

- 测试
  
  > 在浏览器中输入http://localhost:8100, 进入登录页，用户名nop, 密码123。

需要启动nop-entropy项目中的某个服务模块来提供给后端服务，例如nop-entropy/nop-demo/nop-quarkus-demo模块。

如果希望不依赖任何服务启动，可以修改packages/nop-site/.env.development文件中的VITE_USE_MOCK = true。在MOCK模式下会使用packages/nop-site/public/mock/pages目录下的JSON文件来模拟后端服务响应。

- 打包

```bash
pnpm build
```

打包完成后，会在各模块的根目录生成 dist 文件夹

# AMIS扩展
Nop平台的前端目前主要使用AMIS框架，它在AMIS框架的基础上增加了如下扩展以简化编程

## 可逆计算分解

Nop平台基于可逆计算理论针对JSON和XML实现了通用的分解合并机制，可以按照通用的规则将很大的JSON文件分解为多个小型文件，相当于是为AMIS补充了某种模块组织语法。最常用的是两个语法，x:extends用于表示继承外部的某个文件，x:gen-extends表示动态生成可以被继承的JSON对象。

```yaml
x:gen-extends: |
  <web:GenPage view="NopAuthDept.view.xml" page="main" xpl:lib="/nop/web/xlib/web.xlib" />

body:
   name: crud-grid
   bulk-actions:
       - type: action
         id: test-button
         label: 'Test'
         actionType: dialog
         dialog:
            "x:extends": test.page.yaml
            "title": "Test Dialog"
```

以上示例表示，首先根据NopAuthDept.view.xml的配置动态生成一个CRUD页面，然后再在批量操作按钮区增加一个Test按钮，点击这个按钮的时候会弹出一个对话框，对话框的实现代码是复用已有的test.page.yaml文件。title属性会覆盖`x:extends`继承的内容，将对话框的标题设置为`Test Dialog`。

`x:extends`相当于是某种在Tree结构上执行的，类似面向对象的继承操作的通用操作符。

对于任意的JSON格式的外部文件，我们只需要将普通的JSON文件的加载函数修改为Nop平台所提供的ResourceLoader调用即可自动获得可逆计算所定义的分解、合并操作，并支持编译期元编程，允许在编译期进行一系列复杂的结构变换。


## Action模块化

AMIS的DSL本身只支持编写嵌入在页面中的JS片段代码，并不直接支持引入外部编写的JS函数。Nop平台为AMIS引入了一个`xui:import`属性，允许引入外部的JS库，把其中的函数作为事件响应函数来使用。

> 这一机制是通用的，可以用于集成其他的低代码引擎

```
type: page
xui:import: /nop/auth/pages/DemoPage/demo.lib.js
body:
  type: form
  api:
    url: "@action:demo.testAction"
    data:
      a: 1
```

以上示例表示，我们导入一个demo.lib.js库，然后通过demo.testAction引用其中的函数。

`url: "@action:demo.testAction"`这一语法是我们在AMIS的环境抽象基础上所提供的一个action触发机制。它通过拦截AMIS的fetcher调用，识别`@action:`前缀，然后映射到已加载的JS函数上，调用时传入data指定的参数。

脚本库的代码存放在demo.lib.xjs中（注意后缀名是xjs而不是js，我们会通过graalvm-js脚本引擎调用rollup打包工具将xjs转换为js文件，并打包成SystemJs模块结构）。

```javascript
/* @x:gen-extends:
  <!--这里可以用XPL模板语言来生成js代码 -->
 */
import { ajaxFetch} from '@nop/utils'

import {myAction} from './sub.lib.js'

import {myAction2} from './parts/sub2.lib.js'

import {ajaxRequest} from '@nop/utils'

export function testAction(options, page){
    page.env.alert("xx");
    ajaxFetch(options)
    ajaxRequest(options)
    myAction(options,page)
    myAction2(options,page)

    return Promise.resolve({
        status: 200 ,
        data: {
            status: 0
        }
    })
}
```

xjs文件可以按照普通的ESM模块文件的格式进行编写。我们通过在注释区增加`@x:gen-extends`为它增加了编译期动态生成的能力（这一能力在工作流编辑器的动态生成中会使用）。

export的函数是暴露给外部调用的接口函数。import调用会被转化为SystemJs的dependency。这里有一个特殊处理，对于/parts/目录下的文件，我们会调用rollup把它的代码和主文件的代码打包在一起，即parts下的文件认为是内部实现文件，不会暴露为外部可访问的js库。
打包后生成的结果参见文件 [demo.lib.js](https://gitee.com/canonical-entropy/nop-entropy/blob/master/nop-auth/nop-auth-app/_dump/nop-app/nop/auth/pages/DemoPage/demo.lib.js)

除了action调用之外，外部库函数可以用在一切允许嵌入js脚本的地方，为此我们提供了另一个前缀`@fn:`，使用它的时候需要明确传递函数参数（action的函数参数已经约定为options,page）。

```javascript
"onClick":"@fn:demo.myListener(event,props)"
```

重新思考一下onClick的调用过程，我们会发现根据函数名查找到函数实现体的过程很类似于DOM组件的事件冒泡处理过程。事件冒泡时传递的是事件名，逐层向上查找，找到响应函数后处理。AMIS的action响应处理过程是由每个组件检查自己的handleAction是否可以处理对应的actionType，如果不能处理，则调用父组件传入的onAction来进行处理。

**如果我们直接约定向上传递的事件名就是函数名，则事件冒泡处理的过程可以被看作是一个在词法作用域中解析函数名的过程**。在不同层级引入的xui:import相当于是创建了不同的词法作用域，我们总是在最近的词法作用域中查找对应的函数，如果未找到，则继续向上在父作用域中查找。

## GraphQL简化

GraphQL总是需要指定返回字段列表，但是对于一个低代码平台来说，表单中具有哪些字段是一件可以根据模型分析得到的事情，所以我们可以根据表单模型自动推定它需要哪些字段而不需要手工指定。

Nop平台为AMIS增加了一个扩展，使得我们可以通过如下语法构造GraphQL请求

```javascript
url: "@graphql:NopAuthUser__get/{@formSelection}?id=$id"
```

具体介绍可以参见[graphql-java.md](../graphql/graphql-java.md)

## 多语言国际化

AMIS的JSON格式，可以很容易的被读取和处理。因此很多结构变换工作完全可以脱离AMIS框架，由后端进行统一的处理。
Nop平台中对JSON提供了统一的i18n字符串替换机制，它规定了如下两种方式：

1. 使用前缀引导语法识别并替换所有具有`@i18n:`的值

2. 为每个需要被国际化的key，增加对应的`@i18n:key`属性
   例如
   
   ```javascript
   {
   label: "@i18n:common.batchDelete|批量删除"
   }
   或者
   {
   label: "批量删除"
   "@i18n:label" : "common.batchDelete"
   }
   ```

## 权限控制

Nop平台规定了`xui:roles`和`xui:permissions`等权限相关的属性，在接收到JSON格式的页面数据之后，会自动验证权限属性是否满足，并删除所有不满足权限要求的节点。这一处理过程在JSON结构上进行，不涉及到任何前端框架特有的知识。

## Vue组件集成

AMIS底层是基于React技术开发，而Nop平台的前端主要基于Vue3.0技术开发，为了便于集成第三方的vue组件, Nop平台提供了一个通用的包装组件。在AMIS的配置文件中我们可以这样使用

```javascript
{
  "type": "vue-form-item",
  "vueComponent": "Vue组件名",
  "props": {
    传给vue组件的属性
  }
}
```

## 复杂GraphQL调用
```
api:{
  url: '@graphql:query($id:String){ NopAuthUser_get(id:$id){nickName}}',
  data: {
    id: "3"
  }
}
```

通过`@graphql:`前缀来表示graphql请求，此时需要使用完整的grapqhl语法，参数需要指定类型。 通过data属性可以传递graphql请求所需的variables参数。


#### 技术支持

使用中遇到问题或者BUG可以在[Gitee上提Issues](https://gitee.com/canonical-entropy/nop-chaos/issues)

#### 微信群

![](https://gitee.com/canonical-entropy/nop-entropy/raw/master/wechat-group.png)

添加微信时请注明：加入Nop平台群

#### 微信公众号

![](https://gitee.com/canonical-entropy/nop-entropy/raw/master/wechat-public-account.jpg)