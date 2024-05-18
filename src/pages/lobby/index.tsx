import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Lobby = () => {
  const [prizeValue, setPrizeValue] = useState<string[]>([]);
  const [scratchedPercent, setScratchedPercent] = useState(0);

  useEffect(() => {
    initializeCanvas();
  }, []);

  useEffect(() => {
    if (scratchedPercent === 100) {
      // TODO:弹窗提示中奖额度
    }
  }, [scratchedPercent]);

  const initializeCanvas = () => {
    const canvasElement = document.getElementById(
      "scratch"
    ) as HTMLCanvasElement;
    const canvasContext = canvasElement.getContext("2d");

    if (!canvasContext) return;

    // 重置涂层
    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasContext.globalCompositeOperation = "source-over";

    const gradient = canvasContext.createLinearGradient(0, 0, 135, 135);
    gradient.addColorStop(0, "#d63031");
    gradient.addColorStop(1, "#fdcb6e");
    canvasContext.fillStyle = gradient;
    canvasContext.fillRect(0, 0, 320, 320);

    // 初始化刮刮乐随机值
    setPrizeValue(
      new Array(12).fill(0).map(() => (Math.random() * 10 > 5 ? "🐶" : "🐸"))
    );

    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;

    const eventTypes = {
      mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
      },
      touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
      },
    } as const;

    let deviceType: "mouse" | "touch" = "touch";

    const checkIfTouchDevice = () => {
      try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
      } catch (e) {
        deviceType = "mouse";
        return false;
      }
    };

    const getMouseCoordinates = (event: TouchEvent | MouseEvent) => {
      const _pageX = !checkIfTouchDevice()
        ? (event as MouseEvent).pageX
        : (event as TouchEvent).touches[0].pageX;

      const _pageY = !checkIfTouchDevice()
        ? (event as MouseEvent).pageY
        : (event as TouchEvent).touches[0].pageY;

      mouseX = _pageX - canvasElement.getBoundingClientRect().left;
      mouseY = _pageY - canvasElement.getBoundingClientRect().top;
    };

    checkIfTouchDevice();

    canvasElement.addEventListener(eventTypes[deviceType].down, (event) => {
      isDragging = true;
      getMouseCoordinates(event);
      scratch(mouseX, mouseY);
    });

    canvasElement.addEventListener(eventTypes[deviceType].move, (event) => {
      if (!checkIfTouchDevice()) {
        event.preventDefault();
      }
      if (isDragging) {
        getMouseCoordinates(event);
        scratch(mouseX, mouseY);
        calculateScratchedPercentage();
      }
    });

    canvasElement.addEventListener(eventTypes[deviceType].up, () => {
      isDragging = false;
    });

    canvasElement.addEventListener("mouseleave", () => {
      isDragging = false;
    });

    const scratch = (x: number, y: number) => {
      if (!canvasContext) return;

      canvasContext.globalCompositeOperation = "destination-out";
      canvasContext.beginPath();
      canvasContext.arc(x, y, 24, 0, 2 * Math.PI);
      canvasContext.fill();
    };

    // 清空画布
    const revealAll = () => {
      if (!canvasContext) return;

      canvasContext.globalCompositeOperation = "destination-out";
      canvasContext.fillRect(0, 0, canvasElement.width, canvasElement.height);
      setScratchedPercent(100);
    };

    // 计算已刮出的百分比
    const calculateScratchedPercentage = () => {
      if (!canvasContext) return;

      const imageData = canvasContext.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      const totalPixels = imageData.width * imageData.height;
      let transparentPixels = 0;

      for (let i = 0; i < totalPixels * 4; i += 4) {
        if (imageData.data[i + 3] === 0) {
          // Alpha value is 0 for transparent pixels
          transparentPixels++;
        }
      }

      const percent = (transparentPixels / totalPixels) * 100;
      setScratchedPercent(percent);

      // 当刮出百分比超过80时自动开奖
      if (percent > 80) {
        revealAll();
      }
    };

    // 重置刮出百分比
    setScratchedPercent(0);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <div className="relative rounded-md w-[320px] h-[320px]">
        <div className="w-full h-full grid grid-cols-4">
          {prizeValue.map((it) => (
            <div className="border flex justify-center items-center">{it}</div>
          ))}
        </div>
        <canvas
          id="scratch"
          width="320"
          height="320"
          className="absolute inset-0 w-full h-full text-center select-none"
        ></canvas>
      </div>

      <div className="font-bold">Percent {scratchedPercent.toFixed(2)} %</div>
      <Button onClick={initializeCanvas}>Restart</Button>
    </div>
  );
};

export default Lobby;
