import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { device } from "../utils/utils";

const Wrapper = styled.div`
  font-weight: 600;
  font-size: 20px;
  @media ${device.tablet} {
  }
`;

export const Profile = () => {
  const { address, isConnected } = useAccount();

  return (
    <Wrapper>
      {isConnected && (
        <Link to={`/address/${address}`}>View my address details</Link>
      )}
    </Wrapper>
  );
};
