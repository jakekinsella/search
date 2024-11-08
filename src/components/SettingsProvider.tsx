import React, { useState, createContext, useEffect } from 'react';

import { bangs } from '../constants';
import Settings from '../settings';

export const SettingsContext = createContext<Settings.T>({ bangs: [] });

interface Props {
  children: React.ReactNode
}
export function SettingsProvider({ children }: Props) {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<Settings.T | undefined>(undefined);

  const getOrCreate = async () => {
    const tryGet = await Settings.get();
    if (tryGet.type === "result") {
      setSettings(tryGet.settings);
    } else {
      console.log(tryGet);
      const tryCreate = await Settings.create({ bangs: bangs });
      if (tryCreate.type === "result") {
        setSettings(tryCreate.settings);
      } else {
        console.log(tryCreate);
      }
    }
  }

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      getOrCreate();
    }
  }, [loading]);

  return (
    <SettingsContext.Provider value={settings ? settings : { bangs: [] }}>
      {settings ? children : <div/>}
    </SettingsContext.Provider>
  );
}
