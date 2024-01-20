import React, { useState, useEffect } from 'react';
import { Editor } from 'amis-editor';
import { render as renderAmis,  toast, alert, confirm, ToastComponent, AlertComponent } from 'amis';
import { SchemaObject } from 'amis/lib/Schema';

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/css/v4-shims.css";

import 'amis/lib/themes/cxd.css';
import 'amis/lib/helper.css';
import 'amis/sdk/iconfont.css';
import 'amis-editor-core/lib/style.css'
import "./App.css"

function isString(v: any) {
    return Object.prototype.toString.call(v) === "[object String]"
}

function useEvent(event: string, handler: EventListener, passive = false) {
    useEffect(() => {
        // initiate the event handler
        window.addEventListener(event, handler, passive)

        // this will clean up the event every time the component is re-rendered
        return function cleanup() {
            window.removeEventListener(event, handler)
        }
    })
}

type RequestState = {
    onComplete: Function,
    timerId: any
}

const runningRequests: Record<string, RequestState> = {}

let nextReqId: number = 1;

let theme = "cxd"
let locale = "zh-CN"

const env: any = {
    fetcher(config: any) {
        return new Promise((resolve) => {
            const reqId = nextReqId++;
            const timerId = setTimeout(() => {
                onComplete({
                    status: 500,
                    data: {
                        ok: false,
                        status: 500,
                        msg: '调用超时'
                    }
                })
            }, 5000)

            function onComplete(data: any) {
                window.clearTimeout(timerId)
                delete runningRequests[reqId];
                resolve(data)
            }

            runningRequests[reqId] = { onComplete, timerId }

            postMsg({
                type: 'ajaxFetch',
                reqId,
                data: {
                    method:config.method,
                    url: config.url,
                    data: config.data,
                    query: config.query,
                    headers: config.headers
                }
            })
        })
    },
    notify: (type: string, msg: string, conf: any) => {
        if (msg.startsWith("_")) return;
        conf = { closeButton: true, ...conf }
            (toast as any)[type] ?
            (toast as any)[type](msg, conf)
            : console.warn("[notify]", type, msg);
        // toast[type]
        //   ? toast[type](
        //     msg,
        //     conf
        //   )
        //   : console.warn("[notify]", type, msg);
        console.log("[notify]", type, msg);
    },
    confirm,
    alert
}


let inited = false;

let obj: any;

function postMsg(msg:any){
    const str = isString(msg) ? msg : JSON.stringify(msg)
    window.parent?.postMessage(str,"*")
}

function App() {
    const [mobile, setMobile] = useState(false)
    const [preview, setPreview] = useState(false)
    // @ts-ignore
    const defaultSchema: SchemaObject = window["AMIS_JSON"] || {
        type: "page",
        body: "测试",
        title: "标题"
    };
    const [schema, setSchema] = useState(defaultSchema)
    //window["setSchema"] = setSchema;
    if(!obj)
        obj = schema;


    useEvent("message", event => {
        let data = (event as any).data
        if (!data)
            return

        if (isString(data) && data.startsWith("{")) {
            data = JSON.parse(data);
        }

        if (data.type === 'setSchema') {
            inited = true
            obj = data.data
            setSchema(data.data)
        } else if (data.type === 'alert') {
            alert(data.message)
        } else if (data.type === 'toast') {
            const level: string = data.level || 'info'
            if (level === 'info') {
                toast.info(data.message)
            } else {
                toast.error(data.message)
            }
        } else if (data.type === 'ajaxComplete') {
            const state = runningRequests[data.reqId];
            if (state) {
                state.onComplete(data.result)
            }
        }
    })

    if(!inited){
        inited = true
        postMsg("amis-editor-inited")
    }


    const onChange = (value: any) => {
        obj = value;
        //console.log("change", obj)
    };

    const onRollback = () => {
        postMsg("amis-editor-rollback")
    }

    const onReload = () => {
        //setSchema({ type: 'page', body: '' })
        postMsg("amis-editor-reload")
    }

    const onSave = () => {
        console.log("Save", obj)
        //console.log("保存", obj)
        // @ts-ignore
        const msg = {
            type: 'save',
            data: obj
        }
        postMsg(msg)
    };

    const onExit = () => {
        confirm('确认退出吗?').then(b => {
            if (b) {
                postMsg("amis-editor-exit")
            }
        })
    }

    return (
        <div className={"nop-amis-editor"}>
            <ToastComponent
            theme={theme}
            key="toast"
            position={'top-right'}
            locale={locale}
            />
            <AlertComponent theme={theme} key="alert" locale={locale} />
            <div className={"nop-amis-editor-header"}>
                <div>
                    {renderAmis({
                        type: "form",
                        mode: "inline",
                        title: "",
                        wrapWithPanel: false,
                        body: [{
                            type: "switch",
                            option: "预览",
                            name: "preview",
                            onChange: function (v: any) {
                                setPreview(v);
                            }
                        }, {
                            type: "switch",
                            option: "移动端",
                            name: "mobile",
                            onChange: function (v: any) {
                                setMobile(v);
                            }
                        },
                        {
                            type: "button",
                            label: "回滚",
                            tooltip: "放弃所有修改，重置为系统初始化版本",
                            level: "primary",
                            onClick: function () {
                                onRollback();
                            }
                        },
                        {
                            type: "button",
                            label: "重新载入",
                            tooltip: "重新从后台服务器载入页面",
                            level: "primary",
                            onClick: function () {
                                onReload();
                            }
                        },
                        {
                            type: "button",
                            label: "保存",
                            tooltip: "保存到后台服务器",
                            level: "primary",
                            onClick: function () {
                                onSave();
                            }
                        }, {
                            type: "button",
                            label: "退出",
                            tooltip: "退出编辑器",
                            level: "danger",
                            onClick: function () {
                                onExit()
                            }
                        }]
                    })}
                </div>
            </div>
            <Editor className={"nop-amis-editor-body"}
                preview={preview} isMobile={mobile} onChange={onChange}
                value={schema} theme={"cxd"} onSave={onSave} amisEnv={env} />
        </div>
    );
};

export default App;
