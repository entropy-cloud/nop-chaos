declare const _default: {
    type: string;
    "xui:schema": string;
    body: {
        type: string;
        title: null;
        actions: {
            label: string;
            type: string;
            actionType: string;
            level: string;
            api: string;
        }[];
        body: ({
            type: string;
            name: string;
            placeholder: string;
            visibleOn: string;
        } | {
            type: string;
            name: string;
            placeholder: {};
            visibleOn: string;
        })[];
    };
};
export default _default;
