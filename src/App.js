import { Alchemy, Network } from "alchemy-sdk";
import { Route, Switch } from "react-router-dom";
import { useParams } from "react-router-dom";

import Home from "./pages/Home";
import Block from "./pages/Block";
import Transaction from "./pages/Transaction";
import Address from "./pages/Address";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  // const [blockNumber, setBlockNumber] = useState();

  // useEffect(() => {
  //   async function getBlockNumber() {
  //     setBlockNumber(await alchemy.core.getBlockNumber());
  //   }

  //   getBlockNumber();
  // });

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      {/* Can also use a named `children` prop */}
      <Route path="/block/:id" children={<Block />} />
      <Route path="/transaction/:id" children={<Transaction />} />
      <Route path="/address/:id" children={<Address />} />
    </Switch>
  );
}

export default App;
