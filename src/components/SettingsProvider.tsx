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

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      Settings.get()
        .catch(() => Settings.create({ bangs: bangs}))
        .then((settings) => {
          setSettings(settings);
        });
    }
  }, [loading]);

  return (
    <SettingsContext.Provider value={settings ? settings : { bangs: [] }}>
      {settings ? children : <div/>}
    </SettingsContext.Provider>
  );
}
