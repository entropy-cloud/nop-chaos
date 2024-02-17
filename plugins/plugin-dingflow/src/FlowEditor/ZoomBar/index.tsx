import { MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Space } from "antd"
import { memo } from "react"

import { MiniFloatContainer } from "../../components/MiniFloatContainer"

export const ZoomBar = memo((
  props: {
    float?: boolean,
    zoom: number;
    zoomMax: number;
    zoomMin: number;
    onZoomIn: () => void,
    onZoomOut: () => void
  }
) => {
  const { float, zoom, onZoomIn, onZoomOut, zoomMax,zoomMin } = props

  return (
    <MiniFloatContainer className={"workflow-editor-zoombar" + (float ? " float" : "")}>
      <Space>
        <Button
          type={"text"}
          size="small"
          icon={<MinusOutlined />}
          disabled={zoom <= zoomMin}
          onClick={onZoomOut}
        />
        {Math.round(zoom * 100)}%
        <Button
          type={"text"}
          size="small"
          icon={<PlusOutlined />}
          disabled={zoom >= zoomMax}
          onClick={onZoomIn}
        />
      </Space>
    </MiniFloatContainer>
  )
})