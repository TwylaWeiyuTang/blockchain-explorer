import { Alchemy, Network } from "alchemy-sdk";
import { Route, Router, Routes, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Block from "./pages/Block";
import Transaction from "./pages/Transaction";
import Address from "./pages/Address";
import Header from "./components/Header";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);

const priceAPI = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`;

function App() {
  const [ethPrice, setEthPrice] = useState(0);

  useEffect(() => {
    const getEthData = async () => {
      let resPrice = await axios.post(priceAPI);
      setEthPrice(resPrice.data.result.ethusd);
    };
    getEthData();
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home ethPrice={ethPrice} />
        </Route>
        {/* Can also use a named `children` prop */}
        <Route path="/block/:id" children={<Block />} />
        <Route path="/transaction/:id" children={<Transaction />} />
        <Route path="/address/:id" children={<Address ethPrice={ethPrice} />} />
        <Route path="*" children={<NotFound />} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
