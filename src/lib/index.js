import axios from 'axios';

const instance = axios.create({
  	//baseURL: 'http://172.20.10.8:8080'
  	baseURL: 'http://192.168.0.107:8080'
})

export default instance;