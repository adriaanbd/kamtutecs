import axios from 'axios';

const baseUrl = 'https://localhost:3000/';

const sendRequest = async (method, path, data) => {
  const url = `${baseUrl}/${path}`;
  const res = await axios[method](url, data);
  return res;
};

export default sendRequest;
