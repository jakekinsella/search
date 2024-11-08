import React, { useContext } from 'react';
import styled from '@emotion/styled';

import { SettingsContext } from './SettingsProvider';

import { colors } from '../constants';
import { Bang } from '../search';
import Settings from '../settings';

const Card = styled.div`
  min-width: 300px;

  background-color: ${colors.white};

  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 30px;

  border: 1px solid ${colors.black};
  border-radius: 5px;

  box-shadow: 0px 0px 1px ${colors.lightBlack};
`;

const Submit = styled.button`
  width: 100%;
  height: 40px;

  cursor: pointer;

  border: 1px solid ${colors.lightBlack};
  border-radius: 5px;

  background-color: ${colors.white};

  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;

  color: ${colors.black};

  &:hover {
    background-color: ${colors.whiteHover};
  }

  &:active {
    background-color: ${colors.whiteActive};
  }
`;

const Title = styled.div`
  padding-top: 5px;
  padding-bottom: 25px;

  font-size: 22px;
`;

const Label = styled.div`
  padding-bottom: 3px;
`;

interface Props {
  bang: Bang.T;
}

function RemoveBang({ bang }: Props) {
  const settings = useContext(SettingsContext);

  const onSubmit = async (event: any) => {
    event.preventDefault();

    await Settings.removeBang(settings, bang);
    window.location.reload();
  }

  return (
    <Card>
      <Title>Remove Bang</Title>

      <form onSubmit={onSubmit}>
        <Label>Alias: {bang.name}</Label>
        <Label>Template: {bang.template}</Label>
        <br />

        <Submit>Confirm</Submit>
      </form>
    </Card>
  );
}

export default RemoveBang;
