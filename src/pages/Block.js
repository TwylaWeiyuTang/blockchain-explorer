import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import Table from "react-bootstrap/Table";
import { Utils } from "alchemy-sdk";

import { url } from "../components/FinalisedBlock";
import { device } from "../utils/utils";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  @media ${device.tablet} {
  }
`;

const Block = () => {
  let { id } = useParams();

  let hex = Web3.utils.toHex(id);

  const [date, setDate] = useState();
  const [blockData, setBlockData] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getFinalizedBlocks() {
      // fetching the most recent finalised block
      const finResponse = await axios.post(url, {
        jsonrpc: "2.0",
        id: 0,
        method: "eth_getBlockByNumber",
        params: [hex, true],
      });

      const {
        timestamp,
        transactions,
        gasUsed,
        gasLimit,
        miner,
        withdrawls,
        size,
      } = finResponse.data.result;

      console.log(finResponse.data.result);

      // converting hex timestamp to date time
      const timeInSeconds = parseInt(timestamp, 16);
      const timeInMiliseconds = timeInSeconds * 1000;
      const currentDate = new Date(timeInMiliseconds).toLocaleDateString();
      const currentTime = new Date(timeInMiliseconds).toLocaleTimeString();
      setDate(`${currentDate} ${currentTime}`);

      setBlockData({ gasUsed, gasLimit, miner, withdrawls, size });

      // set transactions to the list of total transactions in that block we queried
      setTransactions(transactions);

      // fetch more details of transactions by using a eth_getTransactionReceipt method
      transactions.map(async (tra, i) => {
        const traRes = await axios.post(url, {
          jsonrpc: "2.0",
          id: i,
          method: "eth_getTransactionReceipt",
          params: [tra.hash],
        });

        // create gasUsed property on each transction object
        const newTransactions = [...transactions];
        const transaction = newTransactions.find((a) => a.hash === tra.hash);
        transaction.gasUsed = parseInt(traRes.data.result.gasUsed);
        setTransactions(newTransactions);
      });
    }

    getFinalizedBlocks();
  }, [hex]);

  return (
    <Container>
      <div>Block Height: {id}</div>
      <div>Timestamp: {date} BST</div>
      <div>
        Gas used: {parseInt(blockData.gasUsed)} / {parseInt(blockData.gasLimit)}{" "}
        ({(parseInt(blockData.gasUsed) / parseInt(blockData.gasLimit)) * 100}%)
      </div>
      <div>
        Block reward to:
        <Link to={`/address/${blockData.miner}}`}>{blockData.miner} </Link>
      </div>
      <div>Transactions: {transactions.length} </div>
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Transaction Hash</th>
            <th>Value (in ETH)</th>
            <th>From</th>
            <th>To</th>
            <th>Transaction Fee (in ETH)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.slice(0, 10).map((tra, i) => (
            <tr key={i}>
              <td>
                <Link to={`/transaction/${tra.hash}}`}>
                  {tra.hash.slice(0, 10)}...
                </Link>
              </td>
              <td>{Web3.utils.fromWei(`${parseInt(tra.value)}`, "ether")}</td>
              <td>
                <Link to={`/address/${tra.from}}`}>{tra.from}</Link>
              </td>
              <td>
                {" "}
                <Link to={`/address/${tra.to}}`}>{tra.to}</Link>
              </td>
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
    </Container>
  );
};

export default Block;
