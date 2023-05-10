import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { Utils } from "alchemy-sdk";

import { url } from "../components/FinalisedBlock";
import { device } from "../utils/utils";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Tooltip from "../components/Toolips";
import hamster from "../images/picsvg_download.svg";
import NotFound from "./NotFound";

const Container = styled.div`
  padding: 0 50px;
  @media ${device.tablet} {
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;

  padding-bottom: 12px;
  border-bottom: 1px #ff7ab8 solid;

  .bg-primary {
    background-color: #ff7ab8 !important;
  }

  .badge {
    color: #1a1b1f;
  }
  @media ${device.tablet} {
  }
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 600px !important;
  margin-right: 20px;
  @media ${device.tablet} {
  }
`;

export const Stats = styled.div`
  height: 300px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media ${device.tablet} {
  }
`;

export const StatsInner = styled.div`
  img {
    width: 50px;
  }
  @media ${device.tablet} {
  }
`;

export const Transactions = styled.div`
  background-color: #ff7ab8;
  height: 600px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #1a1b1f;
  @media ${device.tablet} {
  }
`;

export const TraTitle = styled.div`
  width: calc(100vw - 200px);
  font-size: 20px;
  font-weight: 600;
  @media ${device.tablet} {
  }
`;

export const TableContainer = styled.div`
  width: calc(100vw - 200px);
  @media ${device.tablet} {
  }
`;

const Block = () => {
  let { id } = useParams();

  let hex = Web3.utils.toHex(id);

  const [date, setDate] = useState();
  const [blockData, setBlockData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isFinalized, setIsFinalized] = useState("");

  useEffect(() => {
    async function getBlocks() {
      // fetching the block by provided hex
      try {
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

        // get the latest finalized block number
        const ifFinalize = await axios.post(url, {
          jsonrpc: "2.0",
          id: 0,
          method: "eth_getBlockByNumber",
          params: ["finalized", true],
        });

        // check if the one we are querying is finalized or not
        if (id <= parseInt(ifFinalize.data.result.number)) {
          setIsFinalized("Finalized");
        } else {
          setIsFinalized("Unfinalized");
        }

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
      } catch (err) {
        console.log(err);
        setHasError(true);
      }
    }

    getBlocks();
  }, [hex]);

  return (
    <>
      {!hasError ? (
        <Container>
          <TitleWrapper>
            <Title>Block #{id}</Title>
            <Badge bg="primary" style={{ fontSize: "unset" }}>
              {isFinalized}
            </Badge>
          </TitleWrapper>
          <Stats>
            <StatsInner>
              <img src={hamster} alt="hamster icon" /> Timestamp: {date} BST
            </StatsInner>
            <StatsInner>
              <img src={hamster} alt="hamster icon" /> Gas used:{" "}
              {parseInt(blockData.gasUsed)} / {parseInt(blockData.gasLimit)} (
              {(parseInt(blockData.gasUsed) / parseInt(blockData.gasLimit)) *
                100}
              %)
            </StatsInner>
            <StatsInner>
              <img src={hamster} alt="hamster icon" /> Block reward to:
              <Link to={`/address/${blockData.miner}}`}>
                {blockData.miner}{" "}
              </Link>
            </StatsInner>
            <StatsInner>
              {" "}
              <img src={hamster} alt="hamster icon" /> Total Transactions:{" "}
              {transactions.length}{" "}
            </StatsInner>
          </Stats>

          <Transactions>
            <TraTitle>Latest 10 transactions</TraTitle>
            <TableContainer>
              <Table responsive hover>
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
                        <Tooltip content={tra.hash}>
                          <Link to={`/transaction/${tra.hash}`}>
                            {tra.hash.slice(0, 15)}...
                          </Link>
                        </Tooltip>
                      </td>
                      <td>
                        {Web3.utils.fromWei(`${parseInt(tra.value)}`, "ether")}
                      </td>
                      <td>
                        <Tooltip content={tra.from}>
                          <Link to={`/address/${tra.from}`}>
                            {tra.from.slice(0, 15)}...
                          </Link>
                        </Tooltip>
                      </td>
                      <td>
                        <Tooltip content={tra.to}>
                          <Link to={`/address/${tra.to}`}>
                            {tra.to.slice(0, 15)}...
                          </Link>
                        </Tooltip>
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
            </TableContainer>
          </Transactions>
        </Container>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Block;
