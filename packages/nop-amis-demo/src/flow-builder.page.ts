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
        toolbar: [
            {
                type: 'action',
                label: "Save",
                level: 'primary',
                actionType: "commit"
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
                "approve": {
                    type: "form",
                    body: {
                        type: "input-text",
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