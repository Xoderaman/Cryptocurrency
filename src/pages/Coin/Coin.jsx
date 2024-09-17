import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";

const Coin = () => {
  const { coinId } = useParams(); // Get coinId from route params
  const [coinData, setCoinData] = useState(null); // State for coin data
  const [historicalData, setHistoricalData] = useState(null); // State for historical data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const { currency } = useContext(CoinContext); // Get currency from context

  // Fetch coin data based on coinId
  const fetchCoinData = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-GMieJF5mZmUwbRF2X2AowEv8",
      },
    };
  
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((error) => console.error(error));


      }
  const fetchHistoricalData = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-GMieJF5mZmUwbRF2X2AowEv8",
      },
    };
  
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=7&interval=daily`, options)
      .then(response => response.json())
      .then(response => setHistoricalData(response))
      .catch(err => console.error(err));
  }
    

      
  // useEffect to fetch data when coinId or currency changes
  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [coinId, currency]); // Include coinId and currency as dependencies

  
  if (loading) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
      </div>
    );
  }

  // If coin data is available, display it
  if (coinData) {
    return (
      <div className="coin">
        <div className="coin-header">
          <img src={coinData.image.large} alt={coinData.name} />
          <h2>
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </h2>
        </div>
        <div className="coin-info">
          <ul>
            <li>
              <b>Market Cap Rank:</b> {coinData.market_cap_rank}
            </li>
            <li>
              <b>Current Price:</b>{" "}
              {coinData.market_data.current_price[
                currency.name
              ].toLocaleString()}{" "}
              {currency.symbol}
            </li>
            <li>
              <b>Market Cap:</b>{" "}
              {coinData.market_data.market_cap[currency.name].toLocaleString()}{" "}
              {currency.symbol}
            </li>
            <li>
              <b>Total Supply:</b>{" "}
              {coinData.market_data.total_supply
                ? coinData.market_data.total_supply.toLocaleString()
                : "N/A"}
            </li>
            <li>
              <b>Price Change (24h):</b>{" "}
              {coinData.market_data.price_change_percentage_24h}%
            </li>
          </ul>
        </div>
        <div className="coin-chart">
          <h3>Price History (Last 7 Days)</h3>
          {historicalData ? (
            <LineChart historicalData={historicalData} />
          ) : (
            <p>Loading chart data...</p>
          )}
        </div>
      </div>
    );
  }

  return null; // Fallback if data is unavailable
};

export default Coin;
