export default {
  "type": "page",
  "body": {
    "type": "form",
    "title": null,
    "actions": [
      {
        "label": "Cancel",
        "type": "action",
        "actionType": "ajax",
        "level": "default",
        "api": "call://cancel"
      },
      {
        "label": "Apply",
        "type": "action",
        "actionType": "ajax",
        "level": "success",
        "api": "call://change"
      },
      {
        "label":"Yaml/JSON",
        "type":"action",
        "actionType":"ajax",
        "level":"primary",
        "api": "invoke://toggleYaml"
      },
      {
        "label": "Submit",
        "type": "action",
        "actionType": "ajax",
        "level": "primary",
        "api": "call://ok"
      }
    ],
    "body": [
      {
        "type": "editor",
        "name": "schema",
        "placeholder": "{}",
        "visibleOn":"this.lang !='yaml'"
      },
      {
        "type": "yaml-editor",
        "name":"schema",
        "placeholder":{},
        "visibleOn":"this.lang == 'yaml'"
      }
    ]
  }
}
