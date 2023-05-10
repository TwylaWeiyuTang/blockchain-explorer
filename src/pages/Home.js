import React, { useEffect, useState } from "react";
import FinalisedBlock, { url } from "../components/FinalisedBlock";
import { device } from "../utils/utils";
import styled from "styled-components";
import axios from "axios";
import Web3 from "web3";
import SearchBar from "../components/SearchBar";
import { alchemy } from "../App";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

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

const ChartContainer = styled.div`
  width: 30%;
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
  const [feehistory, setFeeHistory] = useState([]);
  const [blockNum, setBlockNum] = useState([]);

  // gas fee data for chart
  const data = {
    labels: blockNum,
    datasets: [
      {
        label: "Recent 5 blocks' base fee per gas",
        borderColor: "#ff7ab8",
        data: feehistory,
      },
    ],
  };

  // ui setup for chart
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#ffe5d9",
          font: {
            size: 16,
          },
        },
        tooltip: {
          // bodyFont: {
          //   family: "Montserrat", // Add your font here to change the font of your tooltip body
          // },
          titleFont: {
            size: 16,
          },
        },
      },
    },
    layout: {
      padding: {
        top: 0,
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#ffe5d9",
          font: {
            size: 14,
          },
        },
      },
      x: {
        ticks: {
          color: "#ffe5d9",
          font: {
            size: 14,
          },
        },
      },
    },
    // tooltips: {
    //   backgroundColor: "#f5f5f5",
    //   titleFontColor: "#333",
    //   bodyFontColor: "#666",
    //   bodySpacing: 4,
    //   xPadding: 12,
    //   mode: "nearest",
    //   intersect: 0,
    //   position: "nearest"
    // },
    // scales: {
    //   yAxes: {
    //     barPercentage: 1.6,
    //     grid: {
    //       display: false,
    //       color: chartLineColor,
    //       zeroLineColor: "transparent"
    //     },
    //     ticks: {
    //       suggestedMin: 0,
    //       suggestedMax: 125000,
    //       padding: 2,
    //       backdropPadding: 2,
    //       backdropColor: "rgba(255,255,255,1)",
    //       color: chartLineColor,
    //       font: {
    //         family: "Montserrat", // Add your font here to change the font of your y axis
    //         size: 12
    //       },
    //       major: {
    //         enable: true
    //       }
    //     }
    //   },
    //   xAxes: {
    //     barPercentage: 1.6,
    //     grid: {
    //       display: false,
    //       zeroLineColor: "transparent"
    //     },
    //     ticks: {
    //       padding: 20,
    //       color: chartLineColor,
    //       font: {
    //         family: "Montserrat", // Add your font here to change the font of your x axis
    //         size: 12
    //       },

    //       major: {
    //         enable: false
    //       }
    //     }
    //   }
    // }
  };

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

      let resFees = await alchemy.core.send("eth_feeHistory", [
        "0x5",
        "latest",
        [],
      ]);

      const { baseFeePerGas, oldestBlock } = resFees;

      // get block numbers data and set the state
      let blockNumbers = [];

      for (let i = 0; i < 5; i++) {
        blockNumbers.push(parseInt(oldestBlock) + i);
      }

      setBlockNum(blockNumbers);

      //// get gas fee data and set the state
      let fees = [];

      baseFeePerGas.map((fee) => {
        fees.push(Web3.utils.fromWei(`${parseInt(fee)}`, "Gwei"));
      });

      setFeeHistory(fees);
    };

    getEthData();

    // getFeeHistory();
  }, [blockNum]);

  return (
    <Container>
      <SearchBar />
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
        <ChartContainer>
          {feehistory && <Line data={data} options={options} />}
        </ChartContainer>
      </BlockContainer>
    </Container>
  );
};

export default Home;
