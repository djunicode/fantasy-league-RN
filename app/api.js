import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://fantasyleague-pl7o.onrender.com',
});

export default instance;
