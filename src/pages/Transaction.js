import styled from "styled-components";
import { device } from "../utils/utils";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../components/FinalisedBlock";
import { Link } from "react-router-dom";
import Web3 from "web3";

const Container = styled.div`
  @media ${device.tablet} {
  }
`;

const Wrapper = styled.div`
  @media ${device.tablet} {
  }
`;

const Transaction = () => {
  let { id } = useParams();
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const getTransactionData = async () => {
      let res = await axios.post(url, {
        id: 1,
        jsonrpc: "2.0",
        params: [id],
        method: "eth_getTransactionReceipt",
      });
      console.log(res.data.result);
      setTransactionData(res.data.result);
    };

    getTransactionData();
  }, [id]);

  let block = parseInt(transactionData.blockNumber);

  return (
    <Container>
      <Wrapper>
        <div>Transaction: {id}</div>
        <div>
          Block Number: <Link to={`/block/${block}`}>{block}</Link>
        </div>
        <div>
          Status:{" "}
          {parseInt(transactionData.status) === 1 ? "Success" : "Failed"}
        </div>
        <div>
          From:{" "}
          <Link to={`/address/${transactionData.from}`}>
            {transactionData.from}
          </Link>
        </div>
        <div>
          To:{" "}
          <Link to={`/address/${transactionData.to}`}>
            {transactionData.to}
          </Link>
        </div>
        <div>Gas used: {parseInt(transactionData.gasUsed)}</div>
        <div>
          Transaction Fee:{" "}
          {transactionData.effectiveGasPrice &&
            transactionData.gasUsed &&
            Web3.utils.fromWei(
              `${transactionData.effectiveGasPrice * transactionData.gasUsed}`
            )}{" "}
          ETH
        </div>
      </Wrapper>
    </Container>
  );
};

export default Transaction;
