import { Bang } from './search';
import Blob from './blob';
import Central from './central';

namespace Settings {
  export interface T {
    bangs: Bang.T[];
  }

  export interface Result {
    type: "result";
    settings: T;
  }
  export interface Error {
    type: "error";
    error: string;
  }

  export const get = async (): Promise<Result | Error> => {
    try {
      const user = await Central.getCurrentUser();
      const blob = await Blob.get(user.email, "search/settings.json");

      return { type: "result", settings: JSON.parse(blob.body) };
    } catch (e: any) {
      return { type: "error", error: e.toString() };
    }
  }

  export const create = async (settings: T): Promise<Result | Error> => {
    try {
      const user = await Central.getCurrentUser();
      await Blob.create(user.email, "search/settings.json", JSON.stringify(settings), []);
      return get();
    } catch (e: any) {
      return { type: "error", error: e.toString() };
    }
  }

  export const addBang = async (settings: T, bang: Bang.T): Promise<Result | Error> => {
    if (settings.bangs.filter((b) => b.name === bang.name).length === 0) {
      console.log({ ...settings, bangs: settings.bangs.concat([bang]) })
      return create({ ...settings, bangs: settings.bangs.concat([bang]) });
    } else {
      return { type: "error", error: `Bang with name "${bang.name}" already exists` };
    }
  }

  export const removeBang = async (settings: T, bang: Bang.T): Promise<Result | Error> => {
    return create({ ...settings, bangs: settings.bangs.filter((b) => b.name !== bang.name) });
  }
}

export default Settings;