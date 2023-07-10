import { __assign, __decorate, __extends, __metadata, __rest } from "tslib";
import React from 'react';
import { themeable, localeable, autobind, noop } from 'amis-core';
import { uncontrollable } from 'amis-core';
import { PickerContainer, ResultBox } from 'amis-ui';
export var PopupEditor = /** @class */ (function (_super) {
    __extends(PopupEditor, _super);
    function PopupEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopupEditor.prototype.handleClear = function () {
        this.props.onChange();
    };
    PopupEditor.prototype.highlightValue = function (value) {
        var _a;
        var cx = (_a = this.props, _a.classnames), __ = _a.translate;
        var html = {
            __html: "<span class=\"label label-info\">".concat(__('Condition.configured'), "</span>")
        };
        return (React.createElement("div", { className: cx('CPGroup-result'), dangerouslySetInnerHTML: html }));
    };
    PopupEditor.prototype.renderBody = function (onChange, value, popOverContainer) {
        var _a = this.props, popup = _a.popup, render = _a.render, rest = __rest(_a, ["popup", "render"]);
        var props = __assign(__assign({}, rest), { value: value, onChange: onChange });
        return render('popup', popup, props);
    };
    PopupEditor.prototype.render = function () {
        var _a;
        var _this = this;
        var cx = (_a = this.props, _a.classnames), placeholder = _a.placeholder, pickerIcon = _a.pickerIcon, locale = _a.locale, translate = _a.translate, classPrefix = _a.classPrefix, onFinalChange = _a.onChange, value = _a.value, title = _a.title, disabled = _a.disabled, popOverContainer = _a.popOverContainer;
        return (React.createElement(PickerContainer, { classnames: cx, classPrefix: classPrefix, translate: translate, locale: locale, onConfirm: onFinalChange, value: value, size: 'md', popOverContainer: popOverContainer, bodyRender: function (params) { return _this.renderBody(params.onChange, params.value, popOverContainer); }, title: title }, function (_a) {
            var onClick = _a.onClick, isOpened = _a.isOpened;
            return (React.createElement(ResultBox, { classnames: cx, classPrefix: classPrefix, translate: translate, locale: locale, className: cx('CBGroup-result', { 'is-active': isOpened }), allowInput: false, clearable: true, result: value, itemRender: _this.highlightValue, onResultChange: noop, onClear: _this.handleClear, disabled: disabled, borderMode: 'full', placeholder: placeholder, actions: pickerIcon && (React.createElement("span", { className: cx('CBPicker-trigger'), onClick: onClick }, pickerIcon)), onResultClick: onClick }));
        }));
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PopupEditor.prototype, "handleClear", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PopupEditor.prototype, "highlightValue", null);
    return PopupEditor;
}(React.Component));
export default themeable(localeable(uncontrollable(PopupEditor, {
    value: 'onChange'
})));
