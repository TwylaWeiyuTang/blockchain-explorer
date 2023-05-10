import styled from "styled-components";
import { device } from "../utils/utils";
import question from "../images/question-hamster.png";
import { Title } from "./Block";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 60vh;
  @media ${device.tablet} {
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${device.tablet} {
  }
`;

const Text = styled.div`
  font-size: 36px;
  font-weight: 600;
  @media ${device.tablet} {
  }
`;

const NotFound = () => {
  return (
    <Container>
      <Wrapper>
        <img
          src={question}
          alt="hamster coco couldn't understand your query!"
        />
        <Text>Query not found!</Text>
      </Wrapper>
    </Container>
  );
};

export default NotFound;
