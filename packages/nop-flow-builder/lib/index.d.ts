import { INode } from 'react-flow-builder';
import { IRegisterNode } from 'react-flow-builder';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { NodeContext } from 'react-flow-builder';

export declare function FlowBuilder(props: FlowBuilderProps): JSX_2.Element;

export declare type FlowBuilderProps = {
    flowModel: string;
    graphDiagram?: {
        nodes: INode[];
    };
};

export declare function getFlowModel(flowModel: string): IRegisterNode[];

export { INode }

export { IRegisterNode }

export { NodeContext }

export declare function registerFlowModel(flowModel: string, nodeModels: IRegisterNode[]): void;

export { }
