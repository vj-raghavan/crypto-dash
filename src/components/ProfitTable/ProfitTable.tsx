import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import { v4 as uuidv4 } from "uuid";
import "./ProfitTable.styles.css";
import * as CONSTANTS from "./constants";
import { Container } from "react-bootstrap";
import { ProfitDisplay } from "../ProfitDisplay";
import { SellBuy, BUY, SELL } from "../SellBuy";
import {
  capitaliseFirstLetter,
  calculateProfitAndTimesIndex,
  convertStringAttributesToNumber,
} from "../../Utils";
import moment from "moment";
import IExchangeRatesData from "../../Types/exchange.rates.type";
import ExchangeRatesService from "../../Services/exchange.rates";
import { CardBlurb } from "../Card/Card";

export const ProfitTable = () => {
  const [rates, setRates] = useState<IExchangeRatesData[] | []>([]);

  useEffect(() => {
    async function fetchRates() {
      try {
        const ratesData = await ExchangeRatesService.getRatesForADay();
        setRates(ratesData.data);
      } catch (err) {
        console.error("Error occurred while fetching exchange rates ", err);
      }
    }
    fetchRates();
  }, []);
  return (
    <Container>
      {rates.map((rate, i) => {
        const { maxProfit, minIndex, maxIndex } = calculateProfitAndTimesIndex(
          convertStringAttributesToNumber(rate.quotes)
        );
        const displayDate = moment
          .unix(parseInt(rate.date))
          .format("DD/MM/YYYY");
        return (
          <Container key={uuidv4()}>
            <CardBlurb coin={rate.currency} key={uuidv4()} />
            <Table
              key={i}
              striped
              bordered
              hover
              className={CONSTANTS.TABLE_TEST_ID}
            >
              <thead>
                <tr>
                  <td className={CONSTANTS.HEADER_COIN_CLASSNAME} colSpan={2}>
                    {rate.currency}
                  </td>
                </tr>
                <tr>
                  <td
                    className={CONSTANTS.HEADER_COIN_TRANS_CLASSNAME}
                    colSpan={2}
                  >
                    {displayDate}
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
                        key={uuidv4()}
                        amount={rate.quotes[minIndex].price}
                        time={rate.quotes[minIndex].time}
                        transactionType='buy'
                      ></SellBuy>
                    }
                  </td>
                  <td>
                    {
                      <SellBuy
                        key={uuidv4()}
                        amount={rate.quotes[maxIndex].price}
                        time={rate.quotes[maxIndex].time}
                        transactionType='sell'
                      ></SellBuy>
                    }
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    Profit{" "}
                    {<ProfitDisplay key={uuidv4()} dollarValue={maxProfit} />}
                  </td>
                </tr>
              </tbody>
            </Table>
            <br />
          </Container>
        );
      })}
    </Container>
  );
};
