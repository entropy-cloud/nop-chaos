import { memo } from "react"
import { WorkFlowEditorInner } from "./WorkFlowEditorInner"
import { ILocales } from "@nop-chaos/locales"
import { IThemeToken } from "workflow-editor-example"
import { IMaterialUIs, FlowEditorScope } from "workflow-editor-example"

export type WorkflowEditorProps = {
  themeMode?: 'dark' | 'light',
  themeToken?: IThemeToken,
  lang?: string,
  locales?: ILocales,
  materialUis?: IMaterialUIs,
}

export const WorkflowEditor = memo((props: WorkflowEditorProps) => {
  const { themeMode, themeToken, lang, locales, materialUis, ...other } = props;
  return (
    <FlowEditorScope
      mode={themeMode}
      themeToken={themeToken}
      lang={lang}
      locales={locales}
      materialUis = {materialUis}
    >
      <WorkFlowEditorInner {...other} />
    </FlowEditorScope>
  )
})