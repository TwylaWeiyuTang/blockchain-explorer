import styled from "styled-components";
import { device } from "../utils/utils";
import { useState } from "react";

import search from "../images/search-icon.svg";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media ${device.tablet} {
  }
`;

const Wrapper = styled.div`
  background-color: #ff7ab8;
  width: 450px;
  border-radius: 10px;
  input {
    width: 100%;
    height: 48px;
    border-radius: 10px;
    border: none;
    transform: translateY(-10px) translateX(10px);
    transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  input:hover,
  :active,
  ::selection {
    transform: none;
  }
  @media ${device.tablet} {
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  margin-left: 20px;

  img {
    width: 40px;
  }
  @media ${device.tablet} {
  }
`;

const SearchBar = () => {
  const [query, setQuery] = useState("");

  let history = useHistory();

  const handleQuery = () => {
    if (query.length < 50 && query.length > 18) {
      history.push(`/address/${query}`);
    } else if (query.length > 50) {
      history.push(`/transaction/${query}`);
    } else if (query.length < 18) {
      history.push(`/block/${query}`);
    }
  };

  return (
    <Container>
      <Wrapper>
        <input
          placeholder="Search by Address/ Txn Hash / Block / Token"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleQuery();
            }
          }}
        />
      </Wrapper>
      <SearchButton onClick={handleQuery}>
        <img src={search} alt="search icon" />
      </SearchButton>
    </Container>
  );
};

export default SearchBar;
