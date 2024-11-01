import { Api, Users } from 'central';

namespace Blob {
  export interface T {
    bucket: string;
    key: string;
    body: string;
    tags: object[];
  }

  interface ListResponse {
    blobs: T[];
  }

  const api = "https://blob.jakekinsella.com/api"

  const request = async (uri: string, options: any) => {
    return Api.apiRequest(`${api}${uri}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'authentication': `Bearer ${Users.token()}`
      }
    });
  }

  export const list = async (bucket: string, prefix: string) => {
    const response = await request(
      "/blobs/list",
      {
        method: "POST",
        body: JSON.stringify({ bucket: bucket, prefix: prefix })
      }
    );

    if (response.ok) {
      const json: ListResponse = await response.json();
      return json.blobs;
    } else {
      throw new Error(`Blob.list(${bucket}, ${prefix}) - failed to fetch`);
    }
  }

  export const get = async (bucket: string, key: string) => {
    const response = await request(
      "/blobs/get",
      {
        method: "POST",
        body: JSON.stringify({ bucket: bucket, key: key })
      }
    );

    if (response.ok) {
      const json: Blob.T = await response.json();
      return json;
    } else {
      throw new Error(`Blob.get(${bucket}, ${key}) - failed to fetch`);
    }
  }

  export const create = async (bucket: string, key: string, body: string, tags: object[]) => {
    const response = await request(
      "/blobs/create",
      {
        method: "POST",
        body: JSON.stringify({ bucket: bucket, key: key, body: body, tags: tags })
      }
    );

    if (response.ok) {
      const json: Blob.T = await response.json();
      return json;
    } else {
      throw new Error(`Blob.create(${bucket}, ${key}) - failed to fetch`);
    }
  }

  export const remove = async (bucket: string, key: string) => {
    const response = await request(
      "/blobs/delete",
      {
        method: "POST",
        body: JSON.stringify({ bucket: bucket, key: key })
      }
    );

    if (response.ok) {
      return;
    } else {
      throw new Error(`Blob.delete(${bucket}, ${key}) - failed to fetch`);
    }
  }
}

export default Blob;