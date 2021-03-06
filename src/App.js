import React, {
  useEffect,
  useState,
  useRef,
} from 'react';
import {
  Container, Row, Col, Button,
} from 'reactstrap';
import Header from './components/Header';
import './styles.css';
import sendRequest from './utils/api';
import { inBounds, getMousePos } from './utils/canvaHelpers';

const BOX = {
  x: null,
  y: null,
  h: null,
  w: null,
};

function App() {
  const [box, setBox] = useState(BOX);
  const [drag, setDrag] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [img, setImage] = useState(null);
  const canvas = useRef(null);
  const ctx = useRef(null);

  useEffect(() => {
    if (imgSrc) {
      canvas.current.focus();
      ctx.current = canvas.current.getContext('2d');
      const cv = canvas.current;
      const scale = [0, 0, cv.width, cv.height];
      const image = new Image();
      image.src = imgSrc;
      setImage(image);
      image.onload = () => ctx.current.drawImage(image, ...scale);
    }
  }, [imgSrc]);

  const draw = () => {
    const rect = [box.x, box.y, box.w, box.h];
    ctx.current.beginPath();
    ctx.current.rect(...rect);
    ctx.current.strokeStyle = 'blue';
    ctx.current.lineWidth = 3;
    ctx.current.stroke();
  };

  const handleDown = e => {
    const cv = canvas.current;
    const { top, left } = cv.getBoundingClientRect();

    setDrag(true);
    setBox({
      ...box,
      x: e.pageX - left,
      y: e.pageY - top,
    });
  };

  const handleUp = () => {
    if (drag) {
      setDrag(drag => !drag);
    }
  };

  const handleMove = e => {
    const cv = canvas.current;
    const { top, left } = cv.getBoundingClientRect();
    const mousePos = getMousePos(top, left, e);
    if (drag) {
      if (inBounds(mousePos)) {
        const context = cv.getContext('2d');
        context.clearRect(0, 0, cv.width, cv.height);
        context.drawImage(img, 0, 0, cv.width, cv.height);

        draw();

        setBox({
          ...box,
          w: e.pageX - left - box.x,
          h: e.pageY - top - box.y,
        });
      } else {
        handleUp();
      }
    }
  };

  const handleUpload = e => {
    const { files } = e.target;
    const file = files[0];
    const reader = new FileReader();
    if (file) {
      reader.onload = e => {
        const src = e.target.result;
        setImgSrc(src);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const img64 = imgSrc.split(',')[1];
      const data = { base64: img64, bbox: box }
      const res = await sendRequest('post', 'textract', data);
			// alert(JSON.stringify(res))
      console.log('RESPONSE', res);
    } catch (error) {
      const errorData = error.response.data;
      console.log(errorData);
    }
  };

  return (
		<Container className="container-sm my-2" style={{width: '500px'}}>
      <Row>
        <Header/>
      </Row>
      <Row>
        <Col xs="12">
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text">Upload</span>
						</div>
						<div className="custom-file">
							<input
								type="file"
								className="custom-file-input"
								id="inputGroupFile01"
								multiple={false}
								onChange={handleUpload}
							/>
							<label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
						</div>
					</div>
					<canvas
						id="canvas"
						ref={canvas}
						width="500"
						height="500"
						onMouseDown={handleDown}
						onMouseUp={handleUp}
						onMouseMove={handleMove}
					/>
					<Button block onClick={handleSubmit} style={{width: "500px"}}>
						Submit
					</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
