import React from "react";
import { ArrowUpCircleFill, ArrowDownCircleFill } from "react-bootstrap-icons";
export const BUY = "buy",
  SELL = "sell";
export const SELLBUYTESTID = "sell-buy";
type SellBuyProps = {
  amount: number;
  time: string;
  transactionType: "buy" | "sell";
};

export const SellBuy = ({ amount, time, transactionType }: SellBuyProps) => {
  return (
    <div data-testid={SELLBUYTESTID}>
      {transactionType === BUY ? (
        <ArrowDownCircleFill color='royalblue' size={30} />
      ) : (
        <ArrowUpCircleFill color='green' size={30} />
      )}{" "}
      $ {amount} at {time}
    </div>
  );
};
