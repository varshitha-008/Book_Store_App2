// src/pages/api.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:2300/api', 
});


export default instance;

