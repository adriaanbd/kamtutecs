import React, { useState } from "react";
import Upload from "./components/Upload";
import Canvas from "./components/Canvas";
import "./styles.css";
import { Container, Row, Col } from "react-bootstrap";

const BOX = {
  x: null,
  y: null,
  h: null,
  w: null
};

function App() {
  const [box, setBox] = useState(BOX)
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
        </Col>
      </Row>
    </Container>
  );
}

export default App;
