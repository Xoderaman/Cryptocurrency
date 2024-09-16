import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br />
          Crypto Marketplace
        </h1>
        <p>
          Explore the world of cryptocurrencies with ease. Buy, sell, and trade
          your favorite digital assets securely4 on the largest crypto
          marketplace.
        </p>
        <form>
          <input type="text" placeholder="Search crypto.." />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">MarketCap</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
