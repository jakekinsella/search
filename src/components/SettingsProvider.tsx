import React, { useState, createContext } from 'react';

import { bangs } from '../constants';

const defaultSettings = { bangs: bangs };
export const SettingsContext = createContext(defaultSettings);

interface Props {
  children: React.ReactNode
}
export function SettingsProvider({ children }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);

  return (
    <SettingsContext.Provider value={settings}>
      {loaded ? children : <div>Loading</div>}
    </SettingsContext.Provider>
  );
}
