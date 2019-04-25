import { AxiosPromise } from 'axios';

export default async (request: AxiosPromise<any>) => {
  try {
    return (await request).data;
  } catch (err) {
    throw err.response.data;
  }
};