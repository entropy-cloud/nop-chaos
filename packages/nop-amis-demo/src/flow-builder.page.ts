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
                nodes:[
                    {
                        id: 'node-0d9d4733-e48c-41fd-a41f-d93cc4718d97',
                        type: 'start',
                        name: 'start',
                        path: ['0'],
                    },
                    {
                        id: 'node-b2ffe834-c7c2-4f29-a370-305adc03c010',
                        type: 'branch',
                        name: '分支节点',
                        children: [
                            {
                                id: 'node-cf9c8f7e-26dd-446c-b3fa-b2406fc7821a',
                                type: 'condition',
                                name: '条件节点',
                                children: [
                                    {
                                        id: 'node-f227cd08-a503-48b7-babf-b4047fc9dfa5',
                                        type: 'node',
                                        name: '普通节点',
                                        path: ['1', 'children', '0', 'children', '0'],
                                    },
                                ],
                                path: ['1', 'children', '0'],
                            },
                            {
                                id: 'node-9d393627-24c0-469f-818a-319d9a678707',
                                type: 'condition',
                                name: '条件节点',
                                children: [],
                                path: ['1', 'children', '1'],
                            },
                        ],
                        path: ['1'],
                    },
                    {
                        id: 'node-972401ca-c4db-4268-8780-5607876d8372',
                        type: 'node',
                        name: '普通节点2',
                        path: ['2'],
                    },
                    {
                        id: 'node-b106675a-5148-4a2e-aa86-8e06abd692d1',
                        type: 'end',
                        name: 'end',
                        path: ['3'],
                    },
                ]
            },

            data: {
                wfName: "aaa",
                steps: {

                }
            }
        }
    }
}