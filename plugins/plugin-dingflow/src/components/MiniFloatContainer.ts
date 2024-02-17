import { styled } from "styled-components"
import { canvasColor } from "../utils/theme-utils"

export const MiniFloatContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  user-select: none;
  background-color: ${canvasColor};
  padding: 4px 8px;
  border-radius: 5px;
  top: 16px;
  &.float{
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, ${props => props.theme.mode === "dark" ? "0.5" : "0.15"});
    transform: ${props => props.theme.mode === "dark" ? "" : "scale(1.05)"};
  }
  transition: all 0.3s;
  &.workflow-editor-zoombar{
    right: 32px;
  }
  &.workflow-operation-bar{
    left: 32px;
  }
`