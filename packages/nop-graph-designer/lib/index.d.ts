import { ApiObject } from '@nop-chaos/nop-core';
import * as React_2 from 'react';
import { SchemaCollectionType } from '@nop-chaos/nop-core';
import { SchemaType } from '@nop-chaos/nop-core';

/**
 * 例如
 * {
 *    wfName: "aaa",
 *    wfVersion: 1,
 *    steps: {
 *      "a": {
 *      }
 *    },
 *    actions: {
 *      "approve": {
 *      }
 *    }
 * }
 */
export declare type GraphData = PlainObject & {
    [groupName: string]: {
        [id: string]: PlainObject & {
            type: string;
        };
    };
};

export declare function GraphDesigner(props: GraphDesignerProps): React_2.JSX.Element;

export declare interface GraphDesignerProps extends Omit<GraphDesignerSchema, 'type'> {
    className?: any;
    value?: any;
    data: {
        [propName: string]: any;
    };
    onChange?: (value: any) => void;
    [propName: string]: any;
    defaultValue: any;
}

export declare interface GraphDesignerSchema extends SchemaType {
    type: 'graph-designer';
    className: string;
    toolbarClassName: string;
    mainEditor: SchemaType;
    toolbar?: SchemaCollectionType;
    subEditors: {
        [groupName: string]: {
            [elementType: string]: SchemaType;
        };
    };
    maxPanelWidth: number;
    minPanelWidth: number;
    /**
     * 初始化数据 API
     */
    initApi?: ApiObject;
    saveApi?: ApiObject;
}

declare type PlainObject = {
    [propName: string]: any;
};

export { }
