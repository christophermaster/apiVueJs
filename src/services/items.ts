import axios from 'axios';

import mapResponse from '../utils/map-response';

export default {
  list: () => {
    return mapResponse(axios.get('https://jsonplaceholder.typicode.com/posts'));
  },
  updateStatus: (id: number, status: string, backupId: number) => {
    return mapResponse(axios.put(`https://jsonplaceholder.typicode.com/posts/${id}/status`, { status, backupId }));
  },
  create: (data: object) => {
    return mapResponse(axios.post('https://jsonplaceholder.typicode.com/posts', data));
  },
  get: (id: number) => {
    return mapResponse(axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`));
  },
  update: (id: number, data: object) => {
    return mapResponse(axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, data));
  },
  delete: (id: number) => {
    return mapResponse(axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`));
  },
};