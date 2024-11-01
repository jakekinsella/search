import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import styled from '@emotion/styled';

import { Icon } from 'central';

import { colors } from '../constants';

const Page = styled.div`
  width: 100%;
  height: 100%;
`;

const PageInner = styled.div`
  width: 100%;
  height: 96%;
`;

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
  align-items: center;
  text-align: center;

  width: 100%;
  height: 100%;
`;

const SearchContainer = styled.div`
  width: 50%;
  margin-top: 25vh;
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

  background: transparent;
  color: ${colors.black};

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

const Footer = styled.div`
  text-align: right;

  padding-right: 20px;
`;

const Settings = styled.a`
  cursor: pointer;
  user-select: none;

  color: ${colors.black};
  text-decoration: none;

  &:hover {
    color: ${colors.blackHover};
  }

  &:active {
    color: ${colors.blackActive};
  }
`;

function Root() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get("q") === null ? "" : params.get("q"));
  const [error] = useState(params.get("e"));

  useEffect(() => {
    setParams({});
  }, [setParams]);

  function onSubmit(event: any) {
    event.preventDefault();
    navigate(`/search?q=${search}`)
  }

  return (
    <Page>
      <PageInner>
        <Container>
          <SearchArea>
            <SearchContainer>
              <Title>Search Somewhere</Title>

              <Form onSubmit={onSubmit}>
                <SearchBar value={search === null ? "" : search} onChange={(event) => setSearch(event.target.value)} />
                <SearchButton>
                  <ReflectX><Icon icon="search" size="1.25em" /></ReflectX>
                </SearchButton>

                <input type="submit" style={{ display: "none" }} />
              </Form>
            </SearchContainer>
            <ErrorLabel>{error}</ErrorLabel>
          </SearchArea>
        </Container>
      </PageInner>

      <Footer>
        <Settings href="/settings">Settings</Settings>
      </Footer>
    </Page>
  );
}

export default Root;
