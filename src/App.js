import { Alchemy, Network } from "alchemy-sdk";
import { Route, Router, Routes, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Block from "./pages/Block";
import Transaction from "./pages/Transaction";
import Address from "./pages/Address";
import Header from "./components/Header";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {/* Can also use a named `children` prop */}
        <Route path="/block/:id" children={<Block />} />
        <Route path="/transaction/:id" children={<Transaction />} />
        <Route path="/address/:id" children={<Address />} />
      </Switch>
    </div>
  );
}

export default App;
