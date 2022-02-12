import React from "react";
import { Header, Banner } from "./components/index";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
import { ProfitTable } from "./components/ProfitTable";

function App() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <div className='App'>
            <Banner />
            <Header />
            <ProfitTable></ProfitTable>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
