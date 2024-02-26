import { IDefaultTheme } from "../theme";

export const canvasColor = (props: { theme: IDefaultTheme }) => props.theme.mode === "light" ? "#f5f5f7" : props.theme.token?.colorBgBase


export const lineColor = (props: { theme: IDefaultTheme }) => props.theme?.mode === "light" ? "#cacaca" : "rgba(255,255,255,0.35)"

export const nodeColor = (props: { theme: IDefaultTheme }) => props.theme.token?.colorBgContainer