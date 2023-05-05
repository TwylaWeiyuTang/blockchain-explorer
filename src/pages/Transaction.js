import styled from "styled-components";
import { device } from "../utils/utils";
import { useParams } from "react-router-dom";

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
  return (
    <Container>
      <Wrapper>Transaction: {id}</Wrapper>
    </Container>
  );
};

export default Transaction;
