import styled from "styled-components";
import { device } from "../utils/utils";
import { useParams } from "react-router-dom";
import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
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
  const [tokenBalance, setTokenBalance] = useState([]);

  useEffect(() => {
    const getTransfers = async () => {
      // fetch all the transactions with a given address
      let etherscanRes = await axios.post(etherscanAPI(id));
      setTransactions(etherscanRes.data.result);

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
      console.log(response.tokenBalances);
      setTokenBalance(response.tokenBalances);

      // transferList.map(async (tra, i) => {
      //   const traRes = await axios.post(url, {
      //     jsonrpc: "2.0",
      //     id: i,
      //     method: "eth_getTransactionReceipt",
      //     params: [tra.hash],
      //   });

      //   let tra.

      //   console.log(traRes);
    };
    getTransfers();
  }, [id]);

  // console.log(accountData.map((acc) => acc.hash));

  return (
    <Container>
      <Wrapper>
        <div>Address: {id}</div>
        <div>Ether Balance: {balance}</div>
        <div>Balance Value: </div>
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
                      <Link to={`/transaction/${tra.hash}}`}>
                        {tra.hash.slice(0, 10)}...
                      </Link>
                    </Tooltip>
                  </td>
                  <td>
                    <Link to={`/block/${tra.blockNumber}`}>
                      {tra.blockNumber}
                    </Link>
                  </td>
                  <td>{tra.methodId}</td>
                  <td>
                    {new Date(tra.timeStamp * 1000).toLocaleTimeString()}{" "}
                    {new Date(tra.timeStamp * 1000).toLocaleDateString()}
                  </td>
                  <td>{tra.from}</td>
                  <td>{tra.from === id ? "Out" : "In"}</td>
                  <td>{tra.to}</td>
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
