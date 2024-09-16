import { createContext, useEffect, useState } from "react";

// Create the CoinContext
export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  // Fetch coin data based on the selected currency
  const fetchAllCoin = async () => {
    // Fixed async declaration
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-GMieJF5mZmUwbRF2X2AowEv8",
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      );
      const data = await response.json();
      setAllCoins(data); // Sets the coin data in the state
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch the coin data when currency changes
  useEffect(() => {
    fetchAllCoin(); // Correctly invoking the function
  }, [currency]);

  // Context value to be shared across components
  const contextValue = {
    allCoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
