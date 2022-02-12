import React from "react";

import Table from "react-bootstrap/Table";
import "./ProfitTable.styles.css";
import * as CONSTANTS from "./constants";
import { Container } from "react-bootstrap";
import { ProfitDisplay } from "../ProfitDisplay";
import { SellBuy, BUY, SELL } from "../SellBuy";
import { capitaliseFirstLetter } from "../../Utils";

export const ProfitTable = () => {
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
            <td className={CONSTANTS.HEADER_BUY_CLASSNAME}>
              {capitaliseFirstLetter(BUY)}
            </td>
            <td className={CONSTANTS.HEADER_SELL_CLASSNAME}>
              {capitaliseFirstLetter(SELL)}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {
                <SellBuy
                  amount={45.88}
                  time='9:45 AM'
                  transactionType='buy'
                ></SellBuy>
              }
            </td>
            <td>
              {
                <SellBuy
                  amount={65.98}
                  time='11:45 AM'
                  transactionType='sell'
                ></SellBuy>
              }
            </td>
          </tr>
          <tr>
            <td colSpan={2}>Profit {<ProfitDisplay dollarValue={-23} />}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};
