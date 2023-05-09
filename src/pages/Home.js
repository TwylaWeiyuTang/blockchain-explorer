import React, { useEffect, useState } from "react";
import FinalisedBlock, { url } from "../components/FinalisedBlock";
import { device } from "../utils/utils";
import styled from "styled-components";
import axios from "axios";
import Web3 from "web3";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  @media ${device.tablet} {
  }
  @media ${device.laptop} {
    flex-direction: column;
  }
`;

const KeyStats = styled.div`
  height: 300px;
  display: flex;
  flex-direction: row;
  width: calc(100vw - 100px);
  justify-content: space-around;
  align-items: center;
  @media ${device.tablet} {
  }
`;

const MarketCap = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #ff7ab8;
  border-right: 1px solid #ff7ab8;
  width: 33.33%;
  @media ${device.tablet} {
  }
`;

const ETHPriceContainer = styled.div`
  height: 100px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${device.tablet} {
  }
`;

const GasPriceContainer = styled.div`
  height: 100px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${device.tablet} {
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  @media ${device.tablet} {
  }
`;

const BlockContainer = styled.div`
  width: calc(100vw - 100px);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  @media ${device.tablet} {
  }
`;

const supplyAPI = `https://api.etherscan.io/api
?module=stats
&action=ethsupply
&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`;

const Home = ({ ethPrice }) => {
  const [ethSupply, setEthSupply] = useState(0);
  const [gasPrice, setGasPrice] = useState(0);
  useEffect(() => {
    const getEthData = async () => {
      let resSupply = await axios.post(supplyAPI);
      let resGasPrice = await axios.post(url, {
        id: 1,
        jsonrpc: "2.0",
        method: "eth_gasPrice",
      });
      setEthSupply(resSupply.data.result);
      setGasPrice(parseInt(resGasPrice.data.result));
    };

    getEthData();
  }, []);

  return (
    <Container>
      <KeyStats>
        <ETHPriceContainer>
          <Title>Latest Ether Price</Title>${ethPrice}
        </ETHPriceContainer>
        <MarketCap>
          <Title>Makret Cap</Title>$
          {(ethPrice * Web3.utils.fromWei(`${ethSupply}`)).toLocaleString()}
        </MarketCap>
        <GasPriceContainer>
          <Title>Latest Per Gas Price</Title>
          {Web3.utils.fromWei(`${gasPrice}`)} eth
        </GasPriceContainer>
      </KeyStats>
      <BlockContainer>
        <FinalisedBlock blockType={"finalized"} />
        <FinalisedBlock blockType={"latest"} />
      </BlockContainer>
    </Container>
  );
};

export default Home;
