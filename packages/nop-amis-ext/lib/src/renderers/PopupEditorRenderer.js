import { __decorate, __rest } from "tslib";
import { FormItem } from 'amis-core';
import React from 'react';
import PopupEditor from '../components/PopupEditor';
export default class PopupEditorControl extends React.Component {
    renderPickerIcon() {
        const { render, pickerIcon } = this.props;
        return pickerIcon ? render('picker-icon', pickerIcon) : undefined;
    }
    render() {
        const _a = this.props, { className, classnames: cx, style, pickerIcon } = _a, rest = __rest(_a, ["className", "classnames", "style", "pickerIcon"]);
        return (React.createElement("div", { className: cx(`ConditionBuilderControl`, className) },
            React.createElement(PopupEditor, Object.assign({ pickerIcon: this.renderPickerIcon() }, rest))));
    }
}
export let PopupEditorRenderer = class PopupEditorRenderer extends PopupEditorControl {
};
PopupEditorRenderer = __decorate([
    FormItem({
        type: 'popup-editor',
        strictMode: false
    })
], PopupEditorRenderer);
