import styled from '@emotion/styled';

import { colors } from '../constants';

export const SearchBar = styled.input`
  display: block;
  box-sizing: border-box;

  width: 100%;
  height: 50px;

  padding-left: 10px;
  padding-right: 10px;

  border: 1px solid ${colors.lightBlack};
  border-radius: 5px;

  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
`;