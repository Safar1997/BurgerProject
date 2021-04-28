import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-burger-ac9e1-default-rtdb.firebaseio.com/',
})

export default instance;