const between = (num, min = 5, max = 495) => min < num && num < max;

const inBounds = ({ x, y }) => {
  const inBound = between(x) && between(y);
  return inBound;
};

const getMousePos = (top, left, e) => ({
  x: e.clientX - left,
  y: e.clientY - top,
});

export { inBounds, getMousePos };
