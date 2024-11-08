import { bangs } from './constants';
import { Bang } from './search';
import Blob from './blob';
import Central from './central';

namespace Settings {
  export interface T {
    bangs: Bang.T[];
  }

  export const get = async (): Promise<T> => {
    const user = await Central.getCurrentUser();
    const blob = await Blob.get(user.email, "search/settings.json");
    return JSON.parse(blob.body);
  }

  export const create = async (settings: T): Promise<T> => {
    const user = await Central.getCurrentUser();
    const blob = await Blob.create(user.email, "search/settings.json", JSON.stringify({ bangs: bangs }), []);
    return JSON.parse(blob.body);
  }
}

export default Settings;