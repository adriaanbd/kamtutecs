import axios from 'axios';

const baseUrl = 'https://localhost:8000';
const ngrok = 'http://6c77661813e8.ngrok.io'
const sendRequest = async (method, path, data) => {
  const url = `${ngrok}/${path}`;
  //const url = `${baseUrl}/${path}`;
  const res = await axios[method](url, data);
  return res;
};

export default sendRequest;
