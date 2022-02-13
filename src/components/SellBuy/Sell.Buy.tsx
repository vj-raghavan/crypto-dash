import React from "react";
import { ArrowUpCircleFill, ArrowDownCircleFill } from "react-bootstrap-icons";
import moment from "moment";
export const BUY = "buy",
  SELL = "sell";
export const SELLBUYTESTID = "sell-buy";
type SellBuyProps = {
  amount: string;
  time: string;
  transactionType: "buy" | "sell";
};

export const SellBuy = ({ amount, time, transactionType }: SellBuyProps) => {
  const formattedTime = moment.unix(parseFloat(time)).format("hh:mm a");
  return (
    <div data-testid={SELLBUYTESTID}>
      {transactionType === BUY ? (
        <ArrowDownCircleFill color='royalblue' size={30} />
      ) : (
        <ArrowUpCircleFill color='green' size={30} />
      )}{" "}
      $ {amount} at {formattedTime}
    </div>
  );
};
