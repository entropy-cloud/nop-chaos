import {
    FormBaseControl,
    FormControlProps,
    FormItem
} from 'amis-core';
import React from 'react';


import { IconSchema } from 'amis/lib/renderers/Icon';
import { SchemaRemark } from 'amis/lib/renderers/Remark';
import PopupEditor from '../components/PopupEditor';

export interface PopupEditorSchema extends FormBaseControl {
    /**
     * 显示一个小图标, 鼠标放上去的时候显示提示内容
     */
    remark?: SchemaRemark;
    /**
     * 显示一个小图标, 鼠标放上去的时候显示提示内容, 这个小图标跟 label 在一起
     */
    labelRemark?: SchemaRemark;

    /**
     * 指定为
     */
    type: 'popup-editor';

    /**
     * 非内嵌模式时 弹窗触发icon
     */
    pickerIcon?: IconSchema;
}

export interface PopupEditorControlProps
    extends FormControlProps,
    Omit<
        PopupEditorSchema,
        'type' | 'className' | 'descriptionClassName' | 'inputClassName'
    > { }

export default class PopupEditorControl extends React.Component<PopupEditorControlProps> {

    renderPickerIcon() {
        const { render, pickerIcon } = this.props;
        return pickerIcon ? render('picker-icon', pickerIcon) : undefined;
    }

    render() {
        const { className, classnames: cx, style, pickerIcon, ...rest } = this.props;


        return (
            <div className= { cx(`ConditionBuilderControl`, className) } >
                <PopupEditor
                    pickerIcon = { this.renderPickerIcon() }
                    {...rest }
                />
            </div>
        );
    }
}

@FormItem({
    type: 'popup-editor',
    strictMode: false
})
export class PopupEditorRenderer extends PopupEditorControl { }
