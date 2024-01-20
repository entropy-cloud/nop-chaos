import { memo } from "react"
import { WorkFlowEditorInner } from "./WorkFlowEditorInner"
import { ILocales } from "@nop-chaos/locales"
import { IThemeToken } from "../../../../examples/workflow-editor/src/workflow-editor"
import { IMaterialUIs, FlowEditorScope } from "../../../../examples/workflow-editor/src/workflow-editor"

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