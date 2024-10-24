import { Api, Users } from 'central';

namespace Central {
  export namespace User {
    export interface T {
      id: string;
      email: string;
    }
  }

  interface ValidateResponse {
    user: User.T;
  }

  const api = "https://central.jakekinsella.com/api"

  const request = async (uri: string, options: any) => {
    return Api.apiRequest(`${api}${uri}`, options);
  }

  export const getCurrentUser = async () => {
    const response = await request(
      "/users/validate",
      {
        method: "POST",
        body: JSON.stringify({ token: Users.token() })
      }
    );

    if (response.ok) {
      const json: ValidateResponse = await response.json();
      return json.user;
    } else {
      throw new Error(`Central.getCurrentUser() - failed to fetch`);
    }
  }
}

export default Central;