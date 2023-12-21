import { IRegisterNode } from "react-flow-builder";

const flowModelRegistry: { [name: string]: IRegisterNode[] } = {}

export function registerFlowModel(flowModel: string, nodeModels: IRegisterNode[]) {
    flowModelRegistry[flowModel] = nodeModels;
}

export function getFlowModel(flowModel: string) {
    return flowModelRegistry[flowModel]
}