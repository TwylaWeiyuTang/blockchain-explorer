import styled from "styled-components";
import { device } from "../utils/utils";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../components/FinalisedBlock";
import { Link } from "react-router-dom";
import Web3 from "web3";
import { Stats, StatsInner, Title, TitleWrapper } from "./Block";
import hamster from "../images/picsvg_download.svg";
import { Badge } from "react-bootstrap";

const Container = styled.div`
  padding: 0 10px;
  width: 100vw;
  overflow: hidden;
  @media ${device.tablet} {
    padding: 0 50px;
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
        <TitleWrapper>
          <Title>Transaction: {id}</Title>
          <Badge bg="primary" style={{ fontSize: "unset" }}>
            {parseInt(transactionData.status) === 1 ? "Success" : "Failed"}
          </Badge>
        </TitleWrapper>

        <Stats>
          <StatsInner>
            <img src={hamster} alt="hamster icon" />
            Block Number: <Link to={`/block/${block}`}>{block}</Link>
          </StatsInner>
          <StatsInner>
            <img src={hamster} alt="hamster icon" />
            Status:{" "}
            {parseInt(transactionData.status) === 1 ? "Success" : "Failed"}
          </StatsInner>
          <StatsInner>
            <img src={hamster} alt="hamster icon" />
            From:{" "}
            <Link to={`/address/${transactionData.from}`}>
              {transactionData.from}
            </Link>
          </StatsInner>
          <StatsInner>
            <img src={hamster} alt="hamster icon" />
            To:{" "}
            <Link to={`/address/${transactionData.to}`}>
              {transactionData.to}
            </Link>
          </StatsInner>
          <StatsInner>
            {" "}
            <img src={hamster} alt="hamster icon" />
            Gas used: {parseInt(transactionData.gasUsed)}
          </StatsInner>
          <StatsInner>
            <img src={hamster} alt="hamster icon" />
            Transaction Fee:{" "}
            {transactionData.effectiveGasPrice &&
              transactionData.gasUsed &&
              Web3.utils.fromWei(
                `${transactionData.effectiveGasPrice * transactionData.gasUsed}`
              )}{" "}
            ETH
          </StatsInner>
        </Stats>
      </Wrapper>
    </Container>
  );
};

export default Transaction;
