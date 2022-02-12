import React from "react";
import { Header, Banner } from "./components/index";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
import { ProfitCalc } from "./components/ProfitCalc";

function App() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <div className='App'>
            <Banner />
            <Header />
            <ProfitCalc></ProfitCalc>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
