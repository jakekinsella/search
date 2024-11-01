import React, { useState, createContext, useEffect } from 'react';

import { bangs } from '../constants';
import { Bang } from '../search';
import Blob from '../blob';
import Central from '../central';

export interface Settings {
  bangs: Bang.T[];
}
export const SettingsContext = createContext<Settings>({ bangs: [] });

async function getSettings(): Promise<Settings> {
  const user = await Central.getCurrentUser();

  const settings = await Blob.get(user.email, "search/settings.json")
    .catch(() => {
      return Blob.create(user.email, "search/settings.json", JSON.stringify(bangs), []);
    })

  return JSON.parse(settings.body);
}

interface Props {
  children: React.ReactNode
}
export function SettingsProvider({ children }: Props) {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<Settings | undefined>(undefined);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      getSettings().then((settings) => {
        setSettings(settings);
      })
    }
  }, [loading]);

  return (
    <SettingsContext.Provider value={settings ? settings : { bangs: [] }}>
      {settings ? children : <div>Loading</div>}
    </SettingsContext.Provider>
  );
}
