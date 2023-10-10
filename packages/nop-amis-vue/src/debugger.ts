export default {
  "type": "page",
  "xui:schema": "amis",
  "body": {
    "type": "form",
    "title": null,
    "actions": [
      {
        "label": "Cancel",
        "type": "action",
        "actionType": "ajax",
        "level": "default",
        "api": {
          url: "action://cancel",
          messages:{
            success: "_"
          }
        }
      },
      {
        "label": "Apply",
        "type": "action",
        "actionType": "ajax",
        "level": "success",
        "api": "action://change"
      },
      {
        "label": "Yaml/JSON",
        "type": "action",
        "actionType": "ajax",
        "level": "primary",
        "api": "action://toggleYaml"
      },
      {
        "label": "Submit",
        "type": "action",
        "actionType": "ajax",
        "level": "primary",
        "api": "action://ok"
      }
    ],
    "body": [
      {
        "type": "editor",
        "name": "schema",
        "placeholder": "{}",
        "visibleOn": "this.lang !='yaml'"
      },
      {
        "type": "yaml-editor",
        "name": "schema",
        "placeholder": {},
        "visibleOn": "this.lang == 'yaml'"
      }
    ]
  }
}
