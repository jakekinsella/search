import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../constants';

const Page = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 5%;
`;

const Title = styled.div`
  width: 50%;

  margin-left: 7px;
  margin-bottom: 10px;

  font-size: 36px;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
`

const SettingsArea = styled.div`
  width: 50%;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;

  outline: 1.5px solid ${colors.lightBlack};
  border-radius: 5px;
`;

const SectionTitle = styled.div`
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;

  margin-bottom: 5px;
`

const SectionBreak = styled.hr`
  margin-top: 10px;
  margin-bottom: 10px;
  border: 0;
  border-top: 1px solid ${colors.lightBlack};
`;

function Settings() {
  return (
    <Page>
      <Container>
        <Title>Settings</Title>

        <SettingsArea>
          <SectionTitle>General</SectionTitle>
          <SectionBreak />

          <SectionTitle>Bangs</SectionTitle>
        </SettingsArea>
      </Container>
    </Page>
  );
}

export default Settings;
