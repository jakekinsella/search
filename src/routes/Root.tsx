import React from 'react';
import styled from '@emotion/styled';

import { SearchBar } from '../components/SearchBar'

export const Container = styled.div`
  width: 100%;
  height: 100%;
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

export const SearchBarContainer = styled.div`
  width: 50%;
`;

function Root() {
  return (
    <Container>
      <SearchArea>
        <SearchBarContainer>
          <Title>Search Somewhere</Title>
          <SearchBar />
        </SearchBarContainer>
      </SearchArea>
    </Container>
  );
}

export default Root;
