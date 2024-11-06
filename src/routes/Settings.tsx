import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import AddBang from '../components/AddBang';
import { SettingsContext } from '../components/SettingsProvider';
import { colors } from '../constants';

const Page = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
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
`;

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
`;

const AddBangText = styled.span`
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
`;

const SectionInner = styled.div`
  font-size: 14px;

  margin-top: 7px;
  padding-left: 4px;
  padding-right: 4px;
`;

const FloatingPrompt = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 80%;

  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;

  z-index: 11;
`;

function Settings() {
  const settings = useContext(SettingsContext);

  const [showAddBang, setShowAddBang] = useState<boolean>(false);

  const hide = () => {
    setShowAddBang(false);
  }

  useEffect(() => {
    const listener = ({ key }: any) => {
      if (key === "Escape") {
        hide();
      }
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener)
  }, []);

  useEffect(() => {
    const listener = () => {
      hide();
    };

    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener)
  }, []);

  return (
    <Page>
      <Container>
        <Title>Settings</Title>

        <SettingsArea>
          <SectionTitle>Bangs</SectionTitle>
          <AddBangText onClick={(event) => { event.stopPropagation(); setShowAddBang(true) }}>+ Add bang</AddBangText>

          <SectionInner>
            {settings.bangs.map((bang) => <div key={bang.name}>{bang.name} / {bang.template}</div>)}
          </SectionInner>
        </SettingsArea>
      </Container>

      <FloatingPrompt style={{ visibility: showAddBang ? "visible" : "hidden" }}>
        <div onClick={(event) => event.stopPropagation() }>
          <AddBang onSubmit={() => hide()} show={showAddBang} />
        </div>
      </FloatingPrompt>
    </Page>
  );
}

export default Settings;
