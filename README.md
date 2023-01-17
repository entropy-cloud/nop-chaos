# Nop Chaos (Nop Platform 2.0的前端部分)

#### 介绍
Nop Platform 2.0是基于可逆计算原理从零开始构建的新一代低代码平台，它致力于克服低代码平台无法摆脱穷举法的困境，从理论层面有效的解决粗粒度软件复用的问题。nop-chaos是Nop平台的前端部分，基于Vue3.0、ant-design-vue、百度AMIS、logicflow、xspreadsheet等技术实现。

#### 设计原理

[可逆计算：下一代软件构造理论](https://zhuanlan.zhihu.com/p/64004026)

[可逆计算的技术实现](https://zhuanlan.zhihu.com/p/163852896)

[从张量积看低代码平台的设计](https://zhuanlan.zhihu.com/p/531474176)

[低代码平台需要什么样的ORM引擎？](https://zhuanlan.zhihu.com/p/543252423)

[为什么百度AMIS是一个优秀的设计](https://zhuanlan.zhihu.com/p/599773955)

#### 软件架构
nop-chaos采用pnpm多模块管理，具有如下模块：
1. nop-site:  前端程序主框架以及对AMIS框架的集成。其中主框架是基于[jeecgboot-vue3](https://gitee.com/jeecg/jeecgboot-vue3)和[vben-admin](https://doc.vvbin.cn/guide/introduction)项目进行改造。

2. nop-server-tool: 在服务端通过rollup对js库进行转换打包的工具

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
打开登录页后，输入用户名nop, 密码123。

目前因为nop-entropy项目尚未提交，无法连接Nop平台的后台，所以只能在MOCK模式下使用。可以修改
packages/nop-site/public/mock/pages目录下的JSON文件查看效果。

- 打包

```bash
pnpm build
```
打包完成后，会在各模块的根目录生成 dist 文件夹


