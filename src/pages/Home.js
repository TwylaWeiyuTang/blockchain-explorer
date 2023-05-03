import React from "react";
import FinalisedBlock from "../components/FinalisedBlock";
import { device } from "../utils/utils";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  @media ${device.tablet} {
  }
  @media ${device.laptop} {
    flex-direction: row;
  }
`;

const Home = () => {
  return (
    <Container>
      <FinalisedBlock blockType={"finalized"} />
      <FinalisedBlock blockType={"latest"} />
    </Container>
  );
};

export default Home;
