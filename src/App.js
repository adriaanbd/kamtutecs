import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';
import Upload from './components/Upload';
import Canvas from './components/Canvas';
import './styles.css';
import sendRequest from './utils/api';

const BOX = {
  x: null,
  y: null,
  h: null,
  w: null,
};

function App() {
  const [box, setBox] = useState(BOX);

  const handleSubmit = async () => {
    try {
      console.log('BOX', box);
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
          <Upload />
          <Canvas
            height="500"
            width="500"
            box={box}
            setBox={setBox}
          />
          <Button
            variant="primary"
            size="lg"
            block
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
