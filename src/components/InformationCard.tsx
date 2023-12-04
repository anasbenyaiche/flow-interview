import React from "react";
import { ITickerData } from "../types/allTypes";
import { CardWrapper } from "./InformationCard.styled";

interface IProps {
  tickerData: ITickerData;
}

const InformationCard: React.FC<IProps> = ({ tickerData }) => {
  return (
    <CardWrapper>
      <h2>Ticker data</h2>
      <p>Symbol: {tickerData.symbol}</p>
      <p>Price: {tickerData.askPrice}</p>
      <p>Quantity: {tickerData.askQty}</p>
    </CardWrapper>
  );
};

export default InformationCard;
