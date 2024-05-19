import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";

interface ScratcherHookProps {
    canvas: string | MutableRefObject<HTMLCanvasElement | null>
    initializeCallback?: (element: HTMLCanvasElement, context: CanvasRenderingContext2D) => void
    // 自动开奖阈值(刮出百分比)
    autoRevalPercent?: number
}

export const useScratcher = (props: ScratcherHookProps) => {
    const { canvas, initializeCallback, autoRevalPercent } = props;
    const [scratchedPercent, setScratchedPercent] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        const element = typeof canvas === 'string' ? document.querySelector(canvas) as HTMLCanvasElement : canvas.current;
        canvasRef.current = element;
        canvasContextRef.current = element?.getContext("2d") || null;

        // 初始化 canvas 尺寸
        setCanvasSize();

        setTimeout(() => initializeCanvas());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canvas]);

    const setCanvasSize = useCallback(() => {
        const canvasElement = canvasRef.current;
        if (!canvasElement) return;

        // 获取 canvas 元素的实际显示尺寸
        const rect = canvasElement.getBoundingClientRect();
        canvasElement.width = rect.width;
        canvasElement.height = rect.height;
    }, []);

    // 清空画布
    const revealCanvas = useCallback(() => {
        const canvasContext = canvasContextRef.current;
        const canvasElement = canvasRef.current;
        if (!canvasElement || !canvasContext) return;

        canvasContext.globalCompositeOperation = "destination-out";
        canvasContext.fillRect(0, 0, canvasElement.width, canvasElement.height);
        setScratchedPercent(100);
    }, []);

    const initializeCanvas = useCallback(() => {
        const canvasContext = canvasContextRef.current;
        const canvasElement = canvasRef.current;
        if (!canvasElement || !canvasContext) return;

        // 重置刮出百分比
        setScratchedPercent(0);

        // 重置涂层
        canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasContext.globalCompositeOperation = "source-over";

        // 填充涂层背景色
        // const gradient = canvasContext.createLinearGradient(0, 0, 135, 135);
        // gradient.addColorStop(0, "#d63031");
        // gradient.addColorStop(1, "#fdcb6e");
        // canvasContext.fillStyle = gradient;
        canvasContext.fillStyle = '#c7c7c7';
        canvasContext.fillRect(0, 0, canvasElement.width, canvasElement.height);

        if (initializeCallback) {
            initializeCallback(canvasElement, canvasContext)
        }

        let mouseX = 0;
        let mouseY = 0;
        let isDragging = false;

        const eventTypes = {
            mouse: { down: "mousedown", move: "mousemove", up: "mouseup" },
            touch: { down: "touchstart", move: "touchmove", up: "touchend" }
        };

        const deviceType = "ontouchstart" in window ? "touch" : "mouse";

        const getMouseCoordinates = (event: Event) => {
            const _pageX = deviceType === "mouse"
                ? (event as MouseEvent).pageX
                : (event as TouchEvent).touches[0].pageX;

            const _pageY = deviceType === "mouse"
                ? (event as MouseEvent).pageY
                : (event as TouchEvent).touches[0].pageY;

            mouseX = _pageX - canvasElement.getBoundingClientRect().left;
            mouseY = _pageY - canvasElement.getBoundingClientRect().top;
        };

        const scratch = (x: number, y: number) => {
            if (!canvasContext) return;

            canvasContext.globalCompositeOperation = "destination-out";
            canvasContext.beginPath();
            canvasContext.arc(x, y, 24, 0, 2 * Math.PI);
            canvasContext.fill();
        };

        // 计算已刮出的百分比
        const calculateScratchedPercentage = () => {
            if (!canvasContext) return;

            const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
            const totalPixels = imageData.width * imageData.height;
            let transparentPixels = 0;

            for (let i = 0; i < totalPixels * 4; i += 4) {
                if (imageData.data[i + 3] === 0) {
                    transparentPixels++;
                }
            }

            const percent = (transparentPixels / totalPixels) * 100;
            setScratchedPercent(percent);

            // 当刮出百分比达到值时自动开奖
            if (autoRevalPercent && percent >= autoRevalPercent) {
                revealCanvas();
            }
        };

        const onMouseDown = (event: Event) => {
            isDragging = true;
            getMouseCoordinates(event);
            scratch(mouseX, mouseY);
            calculateScratchedPercentage();
        };

        const onMouseMove = (event: Event) => {
            if (isDragging) {
                getMouseCoordinates(event);
                scratch(mouseX, mouseY);
                calculateScratchedPercentage();
            }
        };

        const onMouseUp = () => { isDragging = false; };
        const onMouseLeave = () => { isDragging = false; };

        canvasElement.addEventListener(eventTypes[deviceType].down, onMouseDown);
        canvasElement.addEventListener(eventTypes[deviceType].move, onMouseMove);
        canvasElement.addEventListener(eventTypes[deviceType].up, onMouseUp);
        canvasElement.addEventListener("mouseleave", onMouseLeave);

        return () => {
            canvasElement.removeEventListener(eventTypes[deviceType].down, onMouseDown);
            canvasElement.removeEventListener(eventTypes[deviceType].move, onMouseMove);
            canvasElement.removeEventListener(eventTypes[deviceType].up, onMouseUp);
            canvasElement.removeEventListener("mouseleave", onMouseLeave);
        };
    }, [initializeCallback, autoRevalPercent, revealCanvas]);

    return { scratchedPercent, initializeCanvas, revealCanvas };
};
