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
            label: "Edit"
        },

        subEditors: {
            "main":{
                "default":{
                    type: "form",
                    className: "h-full",
                    title: "属性编辑",
                    submitOnChange: true,
                    body:[
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
            wfName: "aaa",
            steps: {
                
            }
        }
    }
}