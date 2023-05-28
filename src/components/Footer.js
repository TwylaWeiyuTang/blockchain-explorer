import styled from "styled-components";
import { device } from "../utils/utils";

const Container = styled.div`
  margin-top: 150px;
  width: 100vw;
  height: 80vh;
  background-color: #ff7ab8;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;

  color: #1a1b1f;
  @media ${device.laptop} {
    margin-top: 200px;
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
    height: 40vh;
    flex-direction: row;
  }
`;

const Left = styled.div`
  width: 30vw;
  display: flex;
  justify-content: center;
  @media ${device.tablet} {
  }
`;

const Center = styled.div`
  width: 30vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${device.laptop} {
    svg {
      width: 300px;
    }
  }
`;

const Text = styled.div`
  color: #1a1b1f;
  font-size: 24px;
  font-weight: 700;
  @media ${device.tablet} {
  }
`;

const Right = styled.div`
  width: 30vw;
  display: flex;
  justify-content: center;
  @media ${device.tablet} {
  }
`;

const Description = styled.div`
  font-size: 16px;
  font-weight: 600;
  @media ${device.tablet} {
  }
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Description>
          A personal project built by{" "}
          <a href="https://twylatang.com" target="_blank" rel="noreferrer">
            Twyla Tang
          </a>
        </Description>
      </Left>
      <Center>
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 275.000000 222.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          {" "}
          <g
            transform="translate(0.000000,282.000000) scale(0.100000,-0.100000)"
            fill="#1a1b1f"
            stroke="none"
          >
            {" "}
            <path d="M1290 1998 c-38 -19 -95 -61 -140 -105 l-77 -73 -12 53 c-16 72 -35 97 -72 97 -17 0 -39 -5 -51 -11 -26 -14 -48 -67 -41 -102 6 -29 44 -76 78 -94 19 -11 18 -12 -7 -50 -42 -59 -76 -142 -105 -250 -22 -82 -26 -121 -27 -243 -1 -94 4 -164 13 -200 21 -83 64 -172 106 -219 36 -39 40 -41 96 -41 33 0 59 2 59 5 0 2 -10 24 -22 47 -45 84 -22 178 42 178 59 0 104 -83 99 -179 l-3 -46 186 -3 186 -2 7 52 c17 126 97 196 156 137 29 -29 21 -88 -20 -146 l-31 -43 33 0 c43 0 76 34 116 118 59 125 65 292 16 438 l-24 72 20 53 c39 100 10 180 -86 244 -30 20 -55 40 -55 45 0 5 -15 28 -34 53 l-34 44 34 27 c51 40 43 96 -13 96 -23 0 -66 -34 -74 -59 -3 -9 -19 -5 -59 13 -30 14 -68 26 -85 27 -16 0 -38 4 -49 8 -17 6 -16 9 10 41 l29 33 -30 -7 c-17 -4 -51 -20 -77 -36 -57 -35 -61 -27 -13 23 20 21 32 37 27 37 -5 0 -37 -14 -72 -32z m22 -275 c36 -41 28 -131 -12 -153 -25 -13 -26 -13 -50 12 -14 15 -20 35 -20 68 0 75 45 115 82 73z m282 -25 c30 -42 10 -128 -29 -128 -36 0 -59 86 -35 131 14 26 45 24 64 -3z m-440 -152 c123 -51 89 -236 -44 -236 -70 0 -120 53 -120 128 0 46 29 88 74 108 40 17 49 17 90 0z m613 -8 c14 -13 23 -33 23 -50 0 -36 -40 -78 -75 -78 -14 0 -37 11 -50 25 -14 13 -25 36 -25 50 0 34 42 75 76 75 15 0 38 -10 51 -22z m-303 -23 c-20 -30 -26 -31 -48 -6 -20 21 -11 29 37 30 27 1 27 1 11 -24z m52 -87 c18 -13 114 -206 114 -227 0 -23 -25 -45 -75 -66 l-40 -16 23 -19 c13 -10 43 -22 67 -26 53 -7 58 -26 24 -81 -63 -102 -253 -96 -317 9 -38 64 -37 73 12 86 49 13 103 53 93 69 -4 6 -28 13 -55 17 -78 10 -85 19 -66 91 9 33 27 84 41 113 22 48 27 52 58 52 19 0 37 4 40 10 6 10 63 2 81 -12z" />{" "}
          </g>{" "}
        </svg>
        <Text>Coco Da Explorer</Text>
      </Center>
      <Right>
        <Description>Built just for fun!</Description>
      </Right>
    </Container>
  );
};

export default Footer;
