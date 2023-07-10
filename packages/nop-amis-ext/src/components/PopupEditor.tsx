import React from 'react';
import {
    ThemeProps,
    themeable,
    LocaleProps,
    localeable,
    autobind,
    animation,
    findTreeIndex,
    getTree,
    spliceTree,
    mapTree,
    guid,
    noop,
    SchemaNode,
    PlainObject
} from 'amis-core';
import { DialogSchemaBase} from 'amis/lib/renderers/Dialog'
import { uncontrollable } from 'amis-core';
import { PickerContainer,ResultBox } from 'amis-ui';

export interface PopupEditorProps extends ThemeProps, LocaleProps {
    pickerIcon?: JSX.Element;
    placeholder?: string;
    title?: string;
    value?: any;
    data?: any;
    onChange: (value?: any) => void;
    disabled?: boolean;
    popOverContainer?: any;
    popup: SchemaNode,
    render: (
        region: string,
        node: SchemaNode,
        props?: PlainObject
      ) => JSX.Element;
}


export interface PopupEditorState {
    tmpValue: any;
}

export class PopupEditor extends React.Component<
    PopupEditorProps,
    PopupEditorState
> {

    @autobind
    handleClear() {
        this.props.onChange();
    }

    @autobind
    highlightValue(value: any) {
      const {classnames: cx, translate: __} = this.props;
      const html = {
        __html: `<span class="label label-info">${__(
          'Condition.configured'
        )}</span>`
      };
  
      return (
        <div className={cx('CPGroup-result')} dangerouslySetInnerHTML={html} />
      );
    }

    renderBody(
        onChange: (value: any) => void,
        value?: any,
        popOverContainer?: any
    ) {
        const {
            popup,
            render,
            ...rest
        } = this.props;

        const props = {...rest, value,onChange}

        return render('popup',popup, props)
    }

    render() {
        const {
            classnames: cx,
            placeholder,
            pickerIcon,
            locale,
            translate,
            classPrefix,
            onChange: onFinalChange,
            value,
            title,
            disabled,
            popOverContainer
        } = this.props;

        return (
            <PickerContainer
                classnames={cx}
                classPrefix={classPrefix}
                translate={translate}
                locale={locale}
                onConfirm={onFinalChange}
                value={value}
                size={'md'}
                popOverContainer={popOverContainer}
                bodyRender={(params: {
                    value: any;
                    onChange: (value: any) => void;
                }) => this.renderBody(params.onChange, params.value,popOverContainer)}
                title={title}
            >
                {({ onClick, isOpened }) => (
                    <ResultBox
                        classnames={cx}
                        classPrefix={classPrefix}
                        translate={translate}
                        locale={locale}
                        className={cx('CBGroup-result', { 'is-active': isOpened })}
                        allowInput={false}
                        clearable={true}
                        result={value}
                        itemRender={this.highlightValue}
                        onResultChange={noop}
                        onClear={this.handleClear}
                        disabled={disabled}
                        borderMode={'full'}
                        placeholder={placeholder}
                        actions={
                            pickerIcon && (
                                <span className={cx('CBPicker-trigger')} onClick={onClick}>
                                    {pickerIcon}
                                </span>
                            )
                        }
                        onResultClick={onClick}
                    ></ResultBox>
                )}
            </PickerContainer>
        );
    }
}

export default themeable(
    localeable(
        uncontrollable(PopupEditor, {
            value: 'onChange'
        })
    )
);
