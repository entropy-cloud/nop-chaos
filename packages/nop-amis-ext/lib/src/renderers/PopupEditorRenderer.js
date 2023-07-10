import { __assign, __decorate, __extends, __rest } from "tslib";
import { FormItem } from 'amis-core';
import React from 'react';
import PopupEditor from '../components/PopupEditor';
var PopupEditorControl = /** @class */ (function (_super) {
    __extends(PopupEditorControl, _super);
    function PopupEditorControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopupEditorControl.prototype.renderPickerIcon = function () {
        var _a = this.props, render = _a.render, pickerIcon = _a.pickerIcon;
        return pickerIcon ? render('picker-icon', pickerIcon) : undefined;
    };
    PopupEditorControl.prototype.render = function () {
        var _a = this.props, className = _a.className, cx = _a.classnames, style = _a.style, pickerIcon = _a.pickerIcon, rest = __rest(_a, ["className", "classnames", "style", "pickerIcon"]);
        return (React.createElement("div", { className: cx("ConditionBuilderControl", className) },
            React.createElement(PopupEditor, __assign({ pickerIcon: this.renderPickerIcon() }, rest))));
    };
    return PopupEditorControl;
}(React.Component));
export default PopupEditorControl;
export var PopupEditorRenderer = /** @class */ (function (_super) {
    __extends(PopupEditorRenderer, _super);
    function PopupEditorRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopupEditorRenderer = __decorate([
        FormItem({
            type: 'popup-editor',
            strictMode: false
        })
    ], PopupEditorRenderer);
    return PopupEditorRenderer;
}(PopupEditorControl));
