import {
    register,
    unRegisterRenderer
} from "amis-core";

export type RendererConfig = {
    type: string,
    isolateScope: boolean,
}

export function defineAmisComponent(config: RendererConfig) {
    unRegisterRenderer(config.type)

    //register(config)(component)
}
