import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Profile } from "./WalletData";
import { device } from "../utils/utils";

import hamster from "../images/picsvg_download.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${device.tablet} {
  }
`;

const Header = () => {
  return (
    <Navbar>
      <Navbar.Brand as={Link} to={"/"} className="nav">
        <img src={hamster} alt="logo" width={"80px"} /> Coco Da Explorer
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Wrapper>
          <ConnectButton>Sign In</ConnectButton>
          <Profile />
        </Wrapper>

        {/* <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
