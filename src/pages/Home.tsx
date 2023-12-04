import React, { useState, useMemo, useCallback, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import InformationCard from "../components/InformationCard";
import SelectPair from "../components/SelectPair";
import { ITickerData, ITrade } from "../types/allTypes";
import { HomeWrapper, InformationWrapper, Wrapper } from "./Home.styled";
import MarketDataTable from "../containers/MarketDataTable";
import { useMarketColumn } from "../hooks/useMarketColumn";

function Home() {
  const [tickerData, setTickerData] = useState<ITickerData | null>(null);
  const [tradesData, setTradesData] = useState<ITrade[]>([]);
  const [sortByOption, setSortByOption] = useState<string>("time");

  const location = useLocation();

  const fetchMarketData = useCallback(
    async (selectedPair) => {
      try {
        const response = await axios.get(
          `https://api1.binance.com/api/v3/ticker/24hr?symbol=${selectedPair}`
        );
        if (response.data !== null) {
          setTickerData(response.data);
        }
      } catch (error) {
        console.error("Error fetching market data:", error);
        throw error;
      }
      try {
        const response = await axios.get(
          `https://api1.binance.com/api/v3/trades?symbol=${selectedPair}`
        );
        setTradesData(response.data);
      } catch (error) {
        console.error("Error fetching market data:", error);
        throw error;
      }
    },
    [setTickerData, setTradesData]
  );

  useEffect(() => {
    const pathArray = location.pathname.split("/");
    const selectedPair = pathArray[pathArray.length - 1];

    if (selectedPair) {
      fetchMarketData(selectedPair);
    }
  }, [location.pathname, fetchMarketData]);

  const handleSortByChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSortByOption(event.target.value);
    },
    []
  );
  const columns = useMarketColumn();

  const sortedTradesData = useMemo(() => {
    return [...tradesData].sort((a, b) => {
      if (sortByOption === "price") {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (sortByOption === "quantity") {
        return parseFloat(a.qty) - parseFloat(b.qty);
      } else {
        return a.time - b.time;
      }
    });
  }, [tradesData, sortByOption]);
  console.log(sortedTradesData);
  return (
    <HomeWrapper>
      <SelectPair />
      <InformationWrapper>
        {tickerData && <InformationCard tickerData={tickerData} />}
      </InformationWrapper>
      {tradesData.length > 0 && (
        <>
          <Wrapper>
            <h2>Recent Trades</h2>
            <label>
              Sort by:
              <select value={sortByOption} onChange={handleSortByChange}>
                <option value="time">Time</option>
                <option value="price">Price</option>
                <option value="quantity">Quantity</option>
              </select>
            </label>
          </Wrapper>
          <MarketDataTable columns={columns} data={sortedTradesData} />
        </>
      )}
    </HomeWrapper>
  );
}

export default Home;
