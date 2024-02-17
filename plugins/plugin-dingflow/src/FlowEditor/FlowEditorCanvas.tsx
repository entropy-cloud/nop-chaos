import {
  CSSProperties,
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo
} from 'react';

import { styled } from 'styled-components';
import { StartNode } from '../nodes/StartNode';
import { ZoomBar } from './ZoomBar';
import { SettingsPanel } from './SettingsPanel';
import { OperationBar } from './OperationBar';
import { FlowEditorSchema } from '../store/types';
import { createFlowEditorStore } from '../store';
import { canvasColor } from '../utils/theme-utils';
import { useRenderContext } from '@nop-chaos/nop-react-core';
import { useStore } from 'zustand';

const CanvasContainer = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  background-color: ${canvasColor};
  position: relative;
  height: 0;
`;

const Canvas = styled.div`
  flex: 1;
  padding: 56px 16px;
  padding-bottom: 0;
  overflow: auto;
  cursor: grab; //grabbing
  display: flex;
`;

const CanvasInner = styled.div`
  flex: 1;
  transform-origin: 0px 0px;
`;
function toDecimal(x: number) {
  const f = Math.round(x * 10) / 10;
  return f;
}

export interface IPosition {
  x: number;
  y: number;
  scrollLeft: number;
  scrollTop: number;
}

export type FlowEditorProps = {
  schema: FlowEditorSchema;
  value: any;
  onChange: (value: any) => void;
  data: any;
  className?: string;
  style?: CSSProperties;
};

export function FlowEditorCanvas(props: FlowEditorProps) {
  const { initApi, saveApi } = props.schema;
  const data = props.data;

  const renderContext = useRenderContext()!;

  const [store] = useState(() => {
    const store = createFlowEditorStore(props.schema, props.value);
    if (initApi) {
      store.getState().setFlowDataLoader(() => {
        return Promise.resolve(
          renderContext.executor(initApi, data, { props, store })
        );
      });
    }

    if (saveApi) {
      store.getState().setFlowDataSaver(flowData => {
        return Promise.resolve(
          renderContext.executor(saveApi, { data: flowData }, { props, store })
        );
      });
    }
    return store;
  });

  const loadFlowData = useStore(store, state => state.loadFlowData);

  // 只有初始化时执行一次
  useEffect(() => {
    loadFlowData();
  }, []);

  const [zoom, setZoom] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const [mousePressedPoint, setMousePressedPoint] = useState<IPosition>();
  const canvasRef = useRef<HTMLDivElement>(null);

  const zoomConfig = useMemo(
    () =>
      props.schema.zoom || {
        initialValue: 1,
        min: 0.1,
        max: 3,
        step: 0.1
      },
    [props.schema.zoom]
  );

  const handleZoomIn = useCallback(() => {
    setZoom(zoom =>
      toDecimal(zoom < zoomConfig.max ? zoom + zoomConfig.step : zoom)
    );
  }, [zoomConfig]);

  const handleZoomOut = useCallback(() => {
    setZoom(zoom =>
      toDecimal(zoom > zoomConfig.min ? zoom - zoomConfig.step : zoom)
    );
  }, [zoomConfig]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    canvasRef.current &&
      setMousePressedPoint({
        x: e.clientX,
        y: e.clientY,
        scrollLeft: canvasRef.current.scrollLeft,
        scrollTop: canvasRef.current.scrollTop
      });
  }, []);

  const handleMouseUp = useCallback(() => {
    setMousePressedPoint(undefined);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!mousePressedPoint) {
        return;
      }

      const dragMoveDiff = {
        x: mousePressedPoint.x - e.clientX,
        y: mousePressedPoint.y - e.clientY
      };

      if (canvasRef.current) {
        canvasRef.current.scrollLeft =
          mousePressedPoint.scrollLeft + dragMoveDiff.x;
        canvasRef.current.scrollTop =
          mousePressedPoint.scrollTop + dragMoveDiff.y;
      }
    },
    [mousePressedPoint]
  );

  const handleScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop > 60 || e.currentTarget.scrollLeft > 60) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  return (
    <CanvasContainer {...props}>
      <Canvas
        ref={canvasRef}
        className={'flow-canvas'}
        style={{
          cursor: mousePressedPoint ? 'grabbing' : 'grab'
        }}
        draggable={false}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onScroll={handleScroll}
      >
        <CanvasInner
          style={{
            transform: `scale(${zoom})`
          }}
          draggable={false}
        >
          <StartNode />
        </CanvasInner>
      </Canvas>
      <OperationBar float={scrolled} />
      <ZoomBar
        float={scrolled}
        zoom={zoom}
        zoomMin={zoomConfig.min}
        zoomMax={zoomConfig.max}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />
      <SettingsPanel />
    </CanvasContainer>
  );
}
