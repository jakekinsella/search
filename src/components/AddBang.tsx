import React, { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled';

import { SettingsContext } from './SettingsProvider';

import { colors } from '../constants';
import Settings from '../settings';

const Card = styled.div`
  width: 325px;
  background-color: ${colors.white};

  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 30px;

  border: 1px solid ${colors.black};
  border-radius: 5px;

  box-shadow: 0px 0px 1px ${colors.lightBlack};
`;

const Textbox = styled.input`
  display: block;
  box-sizing: border-box;

  width: 100%;
  height: 35px;

  padding-left: 10px;
  padding-right: 10px;

  background: transparent;
  color: ${colors.black};

  border: 1px solid ${colors.lightBlack};
  border-radius: 3px;

  font-size: 15px;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
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

const ErrorLabel = styled.div`
  height: 20px;

  font-size: 14px;
`;

const Label = styled.div`
  padding-bottom: 3px;
`;

const Spacer = styled.div`
  height: 10px;
`;

interface Props {
  show: boolean;
}

function AddBang({ show }: Props) {
  const [alias, setAlias] = useState('');
  const [template, setTemplate] = useState('');
  const [error, setError] = useState('');

  const settings = useContext(SettingsContext);

  useEffect(() => {
    if (!show) {
      setAlias('');
      setTemplate('');
      setError('');
    }
  }, [show]);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    
    const result = await Settings.addBang(settings, { name: alias, template: template});
    if (result.type === "result") {
      window.location.reload();
    } else {
      setError(result.error)
    }
  }

  return (
    <Card>
      <Title>Add Bang</Title>

      <form onSubmit={onSubmit}>
        <Label>Alias:</Label>
        <Textbox type="text" onChange={(event) => setAlias(event.target.value)} value={alias} required />
        <Spacer />

        <Label>Template:</Label>
        <Textbox type="text" onChange={(event) => setTemplate(event.target.value)} value={template} required />
        <Spacer />
        
        <ErrorLabel>{error}</ErrorLabel>

        <Submit>Add</Submit>
        <input type="submit" style={{ display: "none" }} />
      </form>
    </Card>
  );
}

export default AddBang;
