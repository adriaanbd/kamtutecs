import React, { useEffect, useState, useRef } from "react";
import imgPath from "../static/dog-cat.png";

const BOX = {
  x: null,
  y: null,
  h: null,
  w: null
};

const Canvas = ({ width, height }) => {
  const [drag, setDrag] = useState(false);
  const [box, setBox] = useState(BOX);
  const [img, setImage] = useState(null);

  const canvas = useRef(null);
  const ctx = useRef(null);

  const handleDown = (e) => {
    const cv = canvas.current;
    const { top, left } = cv.getBoundingClientRect();

    setDrag(true);
    setBox({
      ...box,
      x: e.pageX - left,
      y: e.pageY - top
    });
  }

  const handleUp = () => {
    setDrag(false);
  }

  const handleMove = (e) => {
    if (drag) {
      const cv = canvas.current;
      const { top, left } = cv.getBoundingClientRect();
      const context = cv.getContext("2d");

      setBox({
        ...box,
        w: e.pageX - left - box.x,
        h: e.pageY - top - box.y
      });

      context.clearRect(0, 0, cv.width, cv.height);
      context.drawImage(img, 0, 0, cv.width, cv.height);

      draw();
    }
  };

  const draw = () => {
    const rect = [box.x, box.y, box.w, box.h];
    ctx.current.beginPath();
    ctx.current.rect(...rect);
    ctx.current.strokeStyle = "blue";
    ctx.current.lineWidth = 3;
    ctx.current.stroke();
  }

  useEffect(() => {
    canvas.current.focus();
    ctx.current = canvas.current.getContext("2d");

    const cv = canvas.current;
    const image = new Image();
    const scale = [0, 0, cv.width, cv.height];

    setImage(image);

    image.onload = () => ctx.current.drawImage(image, ...scale);
    image.src = imgPath;
  }, [ctx]);

  return (
    <canvas
      ref={canvas}
      id="canvas"
      width={width}
      height={height}
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onMouseMove={handleMove}
    ></canvas>
  );
}

export default Canvas;
