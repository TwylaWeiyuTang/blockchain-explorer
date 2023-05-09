import styled from "styled-components";
import { device } from "../utils/utils";
import { useParams } from "react-router-dom";
import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { url } from "../components/FinalisedBlock";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Web3 from "web3";
import { alchemy } from "../App";

import Tooltip from "../components/Toolips";

const Container = styled.div`
  @media ${device.tablet} {
  }
`;

const Wrapper = styled.div`
  @media ${device.tablet} {
  }
`;

const Left = styled.div`
  @media ${device.tablet} {
  }
`;

const Right = styled.div`
  @media ${device.tablet} {
  }
`;

export const etherscanAPI = (address = "") => `https://api.etherscan.io/api
?module=account
&action=txlist
&address=${address}
&startblock=0
&endblock=99999999
&page=1
&sort=desc
&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`;

const Address = () => {
  let { id } = useParams();
  const [transactions, setTransactions] = useState();
  const [balance, setBalance] = useState(0);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const getTransfers = async () => {
      // fetch all the transactions with a given address
      let etherscanRes = await axios.post(etherscanAPI(id));
      setTransactions(etherscanRes.data.result.slice(0, 10));
      console.log(etherscanRes.data.result.slice(0, 10));

      // get ethereum balance for a given address
      let getBalance = await axios.post(url, {
        id: 1,
        jsonrpc: "2.0",
        params: [id, "latest"],
        method: "eth_getBalance",
      });

      setBalance(Web3.utils.fromWei(`${parseInt(getBalance.data.result)}`));

      // fetch all the erc-20 token balance
      let response = await alchemy.core.getTokenBalances(id);
      const { tokenBalances } = response;

      setTokens(tokenBalances);

      // get all the tokens metadata with its address returned from last step
      tokenBalances.forEach(async (token) => {
        let res = await alchemy.core.getTokenMetadata(token.contractAddress);
        const tokensList = [...tokenBalances];
        const current = tokensList.find(
          (a) => a.contractAddress === token.contractAddress
        );
        current.name = res.name;
        current.symbol = res.symbol;
        setTokens(tokensList);
      });
    };

    getTransfers();
  }, [id]);

  return (
    <Container>
      <Wrapper>
        <div>Address: {id}</div>
        <div>Ether Balance: {balance}</div>
        <div>Ether Balance Value: </div>
        <div>
          Tokens:
          <Dropdown>
            <Dropdown.Toggle id="dropdown-autoclose-true">
              Token Balances
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {tokens.map((token, i) => (
                <Dropdown.Item
                  href={`/address/${token.contractAddress}`}
                  key={i}
                >
                  <Left>
                    {token.name} ({token.symbol})
                  </Left>
                  <Right>{parseInt(token.tokenBalance).toLocaleString()}</Right>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>Latest 10 transactions:</div>
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Transaction Hash</th>
              <th>Block</th>
              <th>Method</th>
              <th>Timestamp</th>
              <th>From</th>
              <th>In / Out</th>
              <th>To</th>
              <th>Value</th>
              <th>Transaction Fee (in ETH)</th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.map((tra, i) => (
                <tr key={i}>
                  <td>
                    <Tooltip content={tra.hash}>
                      <Link to={`/transaction/${tra.hash}`}>
                        {tra.hash.slice(0, 10)}...
                      </Link>
                    </Tooltip>
                  </td>
                  <td>
                    <Link to={`/block/${tra.blockNumber}`}>
                      {tra.blockNumber}
                    </Link>
                  </td>
                  <td>{Web3.utils.hexToString(`${tra.methodId}`)}</td>
                  <td>
                    {new Date(tra.timeStamp * 1000).toLocaleTimeString()}{" "}
                    {new Date(tra.timeStamp * 1000).toLocaleDateString()}
                  </td>
                  <td>
                    {" "}
                    <Link to={`/address/${tra.from}`}>{tra.from}</Link>
                  </td>
                  <td>
                    {tra.from.toLocaleLowerCase() === id.toLocaleLowerCase()
                      ? "Out"
                      : "In"}
                  </td>
                  <td>
                    <Link to={`/address/${tra.to}`}>{tra.to}</Link>
                  </td>
                  <td>{Web3.utils.fromWei(tra.value)}</td>
                  <td>
                    {tra.gasPrice &&
                      tra.gasUsed &&
                      Web3.utils.fromWei(
                        `${parseInt(tra.gasPrice) * parseInt(tra.gasUsed)}`
                      )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Wrapper>
    </Container>
  );
};

export default Address;