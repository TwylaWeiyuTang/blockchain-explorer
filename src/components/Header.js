import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Profile } from "./WalletData";
import { device } from "../utils/utils";

import hamster from "../images/picsvg_download.svg";
import SearchBar from "./SearchBar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0;
  @media ${device.tablet} {
    margin-left: 20px;
    margin-top: 0;
    margin-bottom: 0;
  }
  @media ${device.laptop} {
    margin-left: 50px;
  }
`;

const Header = () => {
  let location = useLocation();

  return (
    <Navbar>
      <Navbar.Brand as={Link} to={"/"} className="nav">
        <img src={hamster} alt="logo" width={"80px"} /> Coco Da Explorer
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {location.pathname !== "/" && <SearchBar />}
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
