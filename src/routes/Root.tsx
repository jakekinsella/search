import React, { useState } from 'react';
import styled from '@emotion/styled';

import { colors } from '../constants';

export const Container = styled.div`
  width: 100%;
  height: 65%;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;

  padding-bottom: 20px;
`;

export const SearchArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 100%;
  height: 100%;
`;

export const SearchContainer = styled.div`
  width: 50%;
`;

export const Form = styled.form`
  display:flex;
  flex-direction:row;

  outline: 1.5px solid ${colors.lightBlack};
  border-radius: 5px;
`;

export const SearchBar = styled.input`
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

export const SearchButton = styled.button`
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;

  padding-left: 15px;
  padding-right: 15px;

  background: transparent;
  border: none;
  border-left: 1.5px solid ${colors.lightBlack};
  cursor: pointer;

  input:focus ~ & {
    background: ${colors.whiteActive};

    &:hover {
      background: ${colors.lightGray};
    }
  }

  &:hover {
    background: ${colors.whiteActive};
  }
`;

function Root() {
  const [search, setSearch] = useState('');

  function onSubmit(event: any) {
    event.preventDefault();
    console.log(`Search: ${search}`)
  }

  return (
    <Container>
      <SearchArea>
        <SearchContainer>
          <Title>Search Somewhere</Title>

          <Form onSubmit={onSubmit}>
            <SearchBar onChange={(event) => setSearch(event.target.value)} />
            <SearchButton>Go</SearchButton>

            <input type="submit" style={{ display: "none" }} />
          </Form>
        </SearchContainer>
      </SearchArea>
    </Container>
  );
}

export default Root;
