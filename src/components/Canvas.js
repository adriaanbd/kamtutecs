import React, { useEffect, useState, useRef } from "react";
import imgPath from "../static/dog-cat.png";

const between = (num, min=5, max=495) => {
  return min < num && num < max
}

const inBounds = ({ x, y }) => {
  const inBound = between(x) && between(y);
  return inBound;
}

const getMousePos = (top, left, e) => {
  return {
    x: e.clientX - left,
    y: e.clientY - top
  }
}

const Canvas = ({ width, height, box, setBox }) => {
  const [drag, setDrag] = useState(false);
  const [img, setImage] = useState(null);

  const canvas = useRef(null);
  const ctx = useRef(null);

  const handleDown = e => {
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
    if (drag) {
      setDrag(drag => !drag);
    }
  }
  
  const handleMove = e => {
    const cv = canvas.current;
    const { top, left } = cv.getBoundingClientRect();
    const mousePos = getMousePos(top, left, e);
    if (drag) {
      if (inBounds(mousePos)) {
        const context = cv.getContext("2d");
        context.clearRect(0, 0, cv.width, cv.height);
        context.drawImage(img, 0, 0, cv.width, cv.height);
        
        draw();
        
        setBox({
          ...box,
          w: e.pageX - left - box.x,
          h: e.pageY - top - box.y
        });
      } else {
        handleUp()
      }
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
