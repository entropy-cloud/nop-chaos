import { __decorate, __metadata, __rest } from "tslib";
import React from 'react';
import { themeable, localeable, autobind, noop } from 'amis-core';
import { uncontrollable } from 'amis-core';
import { PickerContainer, ResultBox } from 'amis-ui';
export class PopupEditor extends React.Component {
    handleClear() {
        this.props.onChange();
    }
    highlightValue(value) {
        const { classnames: cx, translate: __ } = this.props;
        const html = {
            __html: `<span class="label label-info">${__('Condition.configured')}</span>`
        };
        return (React.createElement("div", { className: cx('CPGroup-result'), dangerouslySetInnerHTML: html }));
    }
    renderBody(onChange, value, popOverContainer) {
        const _a = this.props, { popup, render } = _a, rest = __rest(_a, ["popup", "render"]);
        const props = Object.assign(Object.assign({}, rest), { value, onChange });
        return render('popup', popup, props);
    }
    render() {
        const { classnames: cx, placeholder, pickerIcon, locale, translate, classPrefix, onChange: onFinalChange, value, title, disabled, popOverContainer } = this.props;
        return (React.createElement(PickerContainer, { classnames: cx, classPrefix: classPrefix, translate: translate, locale: locale, onConfirm: onFinalChange, value: value, size: 'md', popOverContainer: popOverContainer, bodyRender: (params) => this.renderBody(params.onChange, params.value, popOverContainer), title: title }, ({ onClick, isOpened }) => (React.createElement(ResultBox, { classnames: cx, classPrefix: classPrefix, translate: translate, locale: locale, className: cx('CBGroup-result', { 'is-active': isOpened }), allowInput: false, clearable: true, result: value, itemRender: this.highlightValue, onResultChange: noop, onClear: this.handleClear, disabled: disabled, borderMode: 'full', placeholder: placeholder, actions: pickerIcon && (React.createElement("span", { className: cx('CBPicker-trigger'), onClick: onClick }, pickerIcon)), onResultClick: onClick }))));
    }
}
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
export default themeable(localeable(uncontrollable(PopupEditor, {
    value: 'onChange'
})));
