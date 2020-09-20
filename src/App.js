import React from "react";
import Upload from "./components/Upload";
import Canvas from "./components/Canvas";
import "./styles.css";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Upload />
          <Canvas height="500" width="500" />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
