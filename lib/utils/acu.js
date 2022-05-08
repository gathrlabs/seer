import axios from 'axios';
import { SERVER_BASE_URL } from "./constants";
import { getSession } from 'next-auth/react';

const acu = axios.create({
  baseURL: SERVER_BASE_URL,
});

acu.interceptors.request.use(async config => {
    const session = await getSession();

    config.headers["Authorization"] = `Bearer 29|8NdaJK3RQr81LkbhWThxtguB3xI6w3tI1Anu7oTq`;

    return config; 
});
  

export default acu;