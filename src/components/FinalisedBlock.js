import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const url = `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`;

const FinalisedBlock = () => {
  const [blocks, setBlocks] = useState([]);
  const [latestBlock, setLatest] = useState();

  useEffect(() => {
    async function getFinalizedBlocks() {
      const blockList = [];

      const finResponse = await axios.post(url, {
        jsonrpc: "2.0",
        id: 0,
        method: "eth_getBlockByNumber",
        params: ["finalized", true],
      });

      setLatest(parseInt(finResponse.data.result.number));

      blockList.push(latestBlock);

      for (let i = 1; i < 6; i++) {
        blockList.push(latestBlock - i);
      }

      setBlocks(blockList);

      // for (let i = 0; i <= 5; i++) {
      //   batch.push({
      //     jsonrpc: "2.0",
      //     id: i,
      //     method: "eth_getBlockByNumber",
      //     params: ["finalized", true],
      //   });
      // }
      // const response = await axios.post(url, batch);

      // for (let i = 0; i < response.length; i++) {
      //   blockList.push(parseInt(response.data[i].result.number));
      // }
      // setBlocks(blockList);
    }

    getFinalizedBlocks();
  }, [blocks, latestBlock]);

  return (
    <div>
      {blocks &&
        blocks.map((block, i) => (
          <div key={i}>
            <Link to={`/block/${block}`}>{block}</Link>
          </div>
        ))}
    </div>
  );
};

export default FinalisedBlock;
