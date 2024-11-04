import React, { useContext } from 'react';
import styled from '@emotion/styled';

import { SettingsContext } from '../components/SettingsProvider';
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
  font-size: 22px;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;

  margin-bottom: 4px;
`

const AddBang = styled.span`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;

  padding-left: 4px;
  padding-right: 4px;

  cursor: pointer;

  color: ${colors.black};
  user-select: none;

  &:hover {
    color: ${colors.blackHover};
  }

  &:active {
    color: ${colors.blackActive};
  }
`

const SectionInner = styled.div`
  font-size: 14px;

  margin-top: 7px;
  padding-left: 4px;
  padding-right: 4px;
`;

function Settings() {
  const settings = useContext(SettingsContext);

  return (
    <Page>
      <Container>
        <Title>Settings</Title>

        <SettingsArea>
          <SectionTitle>Bangs</SectionTitle>
          <AddBang>+ Add bang</AddBang>

          <SectionInner>
            {settings.bangs.map((bang) => <div key={bang.name}>{bang.name} / {bang.template}</div>)}
          </SectionInner>
        </SettingsArea>
      </Container>
    </Page>
  );
}

export default Settings;
