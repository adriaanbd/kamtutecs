import React, {
  useEffect,
  useState,
  useRef,
} from 'react';
import {
  Container, Row, Col, Button,
} from 'reactstrap';
import './styles.css';
// import sendRequest from "./api";

// const BOX = {
//   x: null,
//   y: null,
//   h: null,
//   w: null,
// };

function App() {
  // const [box, setBox] = useState(BOX);
  // const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const canvas = useRef(null);
  const ctx = useRef(null);

  useEffect(() => {
    if (imgSrc) {
      canvas.current.focus();
      ctx.current = canvas.current.getContext('2d');
      const cv = canvas.current;
      const scale = [0, 0, cv.width, cv.height];
      const image = new Image();
      // console.log("BASE64 ENCODING OF IMAGE =>", imgSrc);
      image.src = imgSrc;

      image.onload = () => ctx.current.drawImage(image, ...scale);
    }
  }, [imgSrc]);

  const handleDown = () => {};
  const handleUp = () => {};
  const handleMove = () => {};

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
      console.log(img64);
      // const res = await sendRequest('post', 'textract', box);
      // console.log('RESPONSE', res);
    } catch (error) {
      const errorData = error.response.data;
      console.log(errorData);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <div id="upload-box">
            <input
              type="file"
              name="file"
              accept="image/*"
              multiple={false}
              onChange={handleUpload}
            />
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
          <Button variant="primary" block onClick={handleSubmit}>
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
