import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import AddBang from '../components/AddBang';
import RemoveBang from '../components/RemoveBang';
import { SettingsContext } from '../components/SettingsProvider';

import { colors } from '../constants';
import { Bang } from '../search';

const Page = styled.div`
  width: 100%;
  height: 100%;
`;

const PageInner = styled.div`
  width: 100%;
  height: 96%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 5%;
`;

const Title = styled.div`
  width: 50%;

  margin-bottom: 15px;

  font-size: 36px;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
`;

const SettingsArea = styled.div`
  width: 50%;

  padding-top: 17px;
  padding-bottom: 17px;
  padding-left: 17px;
  padding-right: 17px;

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
  font-size: 15px;
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

  margin-top: 13px;
  padding-left: 4px;
  padding-right: 4px;
`;

const Item = styled.div`
  margin-bottom: 5px;
`;

const ItemInner = styled.span`
  cursor: pointer;
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

const Footer = styled.div`
  text-align: right;

  padding-right: 20px;
`;

const Link = styled.a`
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

function Settings() {
  const settings = useContext(SettingsContext);

  const [showAddBang, setShowAddBang] = useState<boolean>(false);
  const [selectedBang, setSelectedBang] = useState<Bang.T | undefined>(undefined);

  const hide = () => {
    setShowAddBang(false);
    setSelectedBang(undefined);
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

  const renderRemoveBang = (bang : Bang.T) => {
    return (
      <FloatingPrompt>
        <div onClick={(event) => event.stopPropagation() }>
          <RemoveBang bang={bang} />
        </div>
      </FloatingPrompt>
    );
  }

  return (
    <Page>
      <PageInner>
        <Container>
          <Title>Settings</Title>

          <SettingsArea>
            <SectionTitle>Bangs</SectionTitle>
            <AddBangText onClick={(event) => { event.stopPropagation(); setShowAddBang(true); }}>+ Add bang</AddBangText>

            <SectionInner>
              {settings.bangs.map((bang) => <Item key={bang.name}><ItemInner onClick={(event) => { event.stopPropagation(); setSelectedBang(bang); }}>{bang.name} / {bang.template}</ItemInner></Item>)}
            </SectionInner>
          </SettingsArea>
        </Container>
      </PageInner>

      <Footer>
        <Link href="/">Home</Link>
      </Footer>

      {selectedBang !== undefined ? renderRemoveBang(selectedBang) : <span />}

      <FloatingPrompt style={{ visibility: showAddBang ? "visible" : "hidden" }}>
        <div onClick={(event) => event.stopPropagation() }>
          <AddBang show={showAddBang} />
        </div>
      </FloatingPrompt>
    </Page>
  );
}

export default Settings;
