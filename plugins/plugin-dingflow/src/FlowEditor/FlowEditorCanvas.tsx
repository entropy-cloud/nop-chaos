import { useCallback, useRef, useState } from 'react';

import { styled } from 'styled-components';
import { StartNode } from '../nodes/StartNode';
import { ZoomBar } from './ZoomBar';
import { SettingsPanel } from './SettingsPanel';
import { OperationBar } from './OperationBar';

import { canvasColor } from '../utils/theme-utils';
import { useFlowEditorStoreWith } from '../store';

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

export type FlowEditorCanvasProps = {};

const DEFAULT_ZOOM_CONFIG = {
  initialValue: 1,
  min: 0.1,
  max: 3,
  step: 0.1
};

export function FlowEditorCanvas(props: FlowEditorCanvasProps) {
  const [zoom, setZoom] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const [mousePressedPoint, setMousePressedPoint] = useState<IPosition>();
  const canvasRef = useRef<HTMLDivElement>(null);

  const zoomConfig = useFlowEditorStoreWith(
    state => state.flowEditorSchema.zoom || DEFAULT_ZOOM_CONFIG
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
