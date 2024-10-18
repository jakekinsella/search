import { Api } from 'central';

namespace Blob {
  export interface T {
    // TODO: JK
  }

  interface ListResponse {
    blobs: Blob[];
  }

  export const list = async (bucket: string, prefix: string) => {
    const response = await Api.Blob.request(
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

  export const get = async () => {
    // TODO: JK
  }

  export const create = async () => {
    // TODO: JK
  }

  export const remove = async () => {
    // TODO: JK
  }
}

export default Blob;