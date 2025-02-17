import { useRef, useEffect, useState } from 'react';

export default function DrawingTool() {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("pen");
  const toolRef = useRef(tool);
  useEffect(() => {
    toolRef.current = tool;
  }, [tool]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // Initialize canvas background
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let isDrawing = false;
    const getPos = (e) => ({
      x: e.clientX - canvas.getBoundingClientRect().left,
      y: e.clientY - canvas.getBoundingClientRect().top,
    });

    const startDrawing = (e) => {
      isDrawing = true;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    };

    const draw = (e) => {
      if (!isDrawing) return;
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      if (toolRef.current === "pen") {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
      } else if (toolRef.current === "eraser") {
        ctx.strokeStyle = "#f0f0f0";
        ctx.lineWidth = 10;
      }
      ctx.stroke();
    };

    const finishDrawing = () => {
      if (!isDrawing) return;
      isDrawing = false;
      ctx.closePath();
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', finishDrawing);
    canvas.addEventListener('mouseleave', finishDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', finishDrawing);
      canvas.removeEventListener('mouseleave', finishDrawing);
    };
  }, []);

  return (
    <div className="w-full p-10">
      <h3 className="text-2xl font-bold mb-4">Hockey Practice Plan</h3>
      {/* Toolbar */}
      <div className="mb-4">
        <button 
          className={`py-2 px-4 mr-2 border ${tool === "pen" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setTool("pen")}
        >
          Pen
        </button>
        <button 
          className={`py-2 px-4 border ${tool === "eraser" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setTool("eraser")}
        >
          Eraser
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-gray-300"
      ></canvas>
    </div>
  );
}
