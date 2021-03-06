import axios from 'axios';

const baseUrl = 'http://localhost:8002';
//const ngrok = 'http://6c77661813e8.ngrok.io'
const sendRequest = async (method, path, data) => {
  //const url = `${ngrok}/${path}`;
  const url = `${baseUrl}/${path}`;
  const res = await axios[method](url, data);
  return res;
};

export default sendRequest;
