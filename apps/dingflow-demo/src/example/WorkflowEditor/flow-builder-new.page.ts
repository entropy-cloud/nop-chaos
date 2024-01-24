export default {
    type: "page",
    data: {
        a: "A1",
        b: "B2",
        c: "C3",
        d: "D4"
    },
    body: {
        type: "nop-graph-designer",
        name: "designer",
        toolbar: [
            {
                type: 'action',
                label: "Save",
                level: 'primary',
                actionType: "designer:save"
            },
            {
                type: 'action',
                label: "SelectMain",
                level: 'primary',
                actionType: "designer:selectMain",
            }
        ],

        mainEditor: {
            type: "nop-flow-builder",
            flowModel: 'simple', // 在FlowBuilderDemo.tsx中注册的流程显示模型
            label: "Edit"
        },

        subEditors: {
            "main": {
                "default": {
                    type: "form",
                    className: "h-full",
                    title: "属性编辑",
                    submitOnChange: true,
                    body: [
                        {
                            "type": "input-text",
                            label: "wfName",
                            name: "wfName"
                        }
                    ]
                }
            },
            "steps": {
                "step": {
                    type: "form",
                    title: "步骤信息",
                    submitOnChange: true,
                    body: {
                        type: "input-text",
                        label: "displayName",
                        name: "displayName"
                    }
                }
            }
        },

        value: {
            diagram: {
                "startNode": {
                    "id": "start",
                    "nodeType": "start",
                    "childNode": {
                      "nodeType": "approver",
                      "id": "2324fb89-394f-4fa0-a5a5-10dc7306cc94",
                      "name": "审批人",
                      "childNode": {
                        "id": "bc96c847-9dbf-4d01-876c-94cb5c234379",
                        "nodeType": "route",
                        "conditionNodeList": [
                          {
                            "id": "f65e1ddf-220d-496d-8de3-16fdd56d2219",
                            "nodeType": "condition",
                            "name": "条件1",
                            "childNode": {
                              "nodeType": "audit",
                              "id": "c943d0bf-3543-410a-9a75-1b006b99f654",
                              "name": "办理人"
                            }
                          },
                          {
                            "id": "88a6610f-2ed2-48d4-bcf4-53e8f61b164b",
                            "nodeType": "condition",
                            "name": "条件2",
                            "childNode": {
                              "nodeType": "notifier",
                              "id": "68187b5e-55d8-4f08-8b16-3702090e1eaf",
                              "name": "抄送人"
                            }
                          }
                        ],
                        "name": "条件分支",
                        "childNode": {
                          "nodeType": "notifier",
                          "id": "3f1d31e5-6f12-4e05-8518-bebfeeede702",
                          "name": "抄送人"
                        }
                      }
                    }
                  }
            },
            data: {
                wfName: "aaa",
                steps: {

                }
            }
        }
    }
}