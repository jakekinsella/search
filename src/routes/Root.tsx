import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import styled from '@emotion/styled';

import { Icon } from '../components/Icon';

import { colors } from '../constants';

const Container = styled.div`
  width: 100%;
  height: 65%;
`;

const Title = styled.h1`
  font-size: 36px;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;

  padding-bottom: 20px;
`;

const SearchArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 100%;
  height: 100%;
`;

const SearchContainer = styled.div`
  width: 50%;
`;

const Form = styled.form`
  display:flex;
  flex-direction:row;

  outline: 1.5px solid ${colors.lightBlack};
  border-radius: 5px;
`;

const SearchBar = styled.input`
  display: block;
  box-sizing: border-box;

  width: 100%;
  height: 50px;

  padding-left: 10px;
  padding-right: 10px;

  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;

  border: none;

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;

  padding-top: 8px;
  padding-left: 15px;
  padding-right: 15px;

  background: transparent;
  border: none;
  border-left: 1.5px solid ${colors.lightBlack};
  cursor: pointer;

  color: ${colors.black2};

  &:hover {
    background: ${colors.whiteHover};
  }

  &:active {
    background: ${colors.whiteActive};
  }
`;

const ReflectX = styled.div`
  transform: scaleX(-1);
`;

const ErrorLabel = styled.div`
  width: 100%
  height: 20px;
  margin-top: 5px;

  font-size: 14px;
`;

function Root() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get("q"));
  const [error, setError] = useState(params.get("e"));

  useEffect(() => {
    setParams("taint");
  }, []);

  // TODO: JK clear out e when going back in history

  function onSubmit(event: any) {
    event.preventDefault();
    navigate(`/search?q=${search}`)
  }

  return (
    <Container>
      <SearchArea>
        <SearchContainer>
          <Title>Search Somewhere</Title>

          <Form onSubmit={onSubmit}>
            <SearchBar onChange={(event) => setSearch(event.target.value)} />
            <SearchButton>
              <ReflectX><Icon icon="search" size="1.25em" /></ReflectX>
            </SearchButton>

            <input type="submit" style={{ display: "none" }} />
          </Form>
        </SearchContainer>
        <ErrorLabel>{error}</ErrorLabel>
      </SearchArea>
    </Container>
  );
}

export default Root;
