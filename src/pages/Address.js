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

const Address = () => {
  let { id } = useParams();
  return (
    <Container>
      <Wrapper>Address: {id.slice(0, id.length - 1)} </Wrapper>
    </Container>
  );
};

export default Address;
