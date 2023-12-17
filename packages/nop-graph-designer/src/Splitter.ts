import { useCallback, useRef } from 'react';

export type SplitterOptions = {
    alignRight: boolean,
    asideMinWidth: number,
    asideMaxWidth: number
}

export function useSplitter(options: SplitterOptions) {
    const codeWrapRef = useRef<HTMLElement | null>(null);
    const start = useRef({ startX: 0, startWidth: 0 });

    const handleResizeMouseDown = useCallback((e: React.MouseEvent) => {
        const isRightMB = e.nativeEvent.which === 3;

        if (isRightMB) {
            return;
        }

        const current = e.currentTarget.parentElement
        if (!current)
            return

        const handleResizeMouseMove = (e) => {
            const dx = e.clientX - start.current.startX;
            const mx = start.current.startWidth + (options.alignRight ? -dx : dx);
            const width = Math.min(Math.max(mx, options.asideMinWidth), options.asideMaxWidth);
            if (codeWrapRef.current)
                codeWrapRef.current.style.width = `${width}px`;
        };

        const handleResizeMouseUp = () => {
            document.removeEventListener("mousemove", handleResizeMouseMove);
            document.removeEventListener("mouseup", handleResizeMouseUp);
        };


        codeWrapRef.current = current
        document.addEventListener("mousemove", handleResizeMouseMove);
        document.addEventListener("mouseup", handleResizeMouseUp);
        start.current.startX = e.clientX;
        start.current.startWidth = current.offsetWidth;
    }, [start]);


    return [handleResizeMouseDown];
}