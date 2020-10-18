import axios from 'axios';

const baseUrl = 'https://localhost:3000/';

export const sendRequest = async (method, path='textract', data) => {
  const url = `${baseUrl}/${path}`;
  const res = await axios[method](url, data);
  return res;
};