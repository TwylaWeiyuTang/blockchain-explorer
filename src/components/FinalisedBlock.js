import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { device } from "../utils/utils";

export const url = `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`;

const Container = styled.div`
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 3/4;

  border: 3px solid #ff7ab8;
  background-color: #ff7ab8;
  border-radius: 15px;
  color: #1a1b1f;

  @media ${device.tablet} {
  }
  @media ${device.laptop} {
    width: 25vw;
  }
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 50px;
  text-transform: capitalize;

  @media ${device.tablet} {
  }
`;

const BlocksWrapper = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  a {
    font-size: 24px;
  }
  @media ${device.tablet} {
  }
`;

const FinalisedBlock = ({ blockType }) => {
  const [blocks, setBlocks] = useState([]);
  const [latestBlock, setLatest] = useState();
  const [blockData, setBlockData] = useState([]);

  useEffect(() => {
    async function getFinalizedBlocks() {
      try {
        const blockList = [];

        // fetching the most recent finalised block
        const finResponse = await axios.post(url, {
          jsonrpc: "2.0",
          id: 0,
          method: "eth_getBlockByNumber",
          params: [blockType, true],
        });

        // console.log(finResponse.data.result);
        // const { timestamp, size, number } = finResponse.data.result;

        // setBlockData({ timestamp, size, number });

        setLatest(parseInt(finResponse.data.result.number));

        blockList.push(latestBlock);

        for (let i = 1; i < 6; i++) {
          blockList.push(latestBlock - i);
        }

        // set 6 the most recent finalised blocks
        setBlocks(blockList);
      } catch (err) {
        console.log(err);
      }
    }

    getFinalizedBlocks();
  }, [blocks, latestBlock, blockType]);

  return (
    <Container>
      <Title>Recent {blockType} Blocks</Title>
      <BlocksWrapper>
        {blocks &&
          blocks.map((block, i) => (
            <div key={i}>
              <Link to={`/block/${block}`}>{block}</Link>
            </div>
          ))}
      </BlocksWrapper>
    </Container>
  );
};

export default FinalisedBlock;
