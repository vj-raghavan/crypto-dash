import React from "react";

import Table from "react-bootstrap/Table";
import "./ProfitCalc.styles.css";
import * as CONSTANTS from "./constants";
import { Container } from "react-bootstrap";
export const ProfitCalc = () => {
  return (
    <Container>
      <Table striped bordered hover className={CONSTANTS.TABLE_TEST_ID}>
        <thead>
          <tr>
            <td className={CONSTANTS.HEADER_COIN_CLASSNAME} colSpan={2}>
              ETH
            </td>
          </tr>
          <tr>
            <td className={CONSTANTS.HEADER_COIN_TRANS_CLASSNAME} colSpan={2}>
              {new Date().toLocaleDateString()}
            </td>
          </tr>
          <tr>
            <td className={CONSTANTS.HEADER_BUY_CLASSNAME}>Buy</td>
            <td className={CONSTANTS.HEADER_SELL_CLASSNAME}>Sell</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry the Bird</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};
