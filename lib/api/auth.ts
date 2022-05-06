import acuApi from '../utils/acu';

const AuthApi = {
  login: async () => {
    console.log('login from authapi');
    try {
      const response = await acuApi.post(`/api/login`, {
        email: 'tomscerri@gmail.com',
        password: '1Jetsons'
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};

export default AuthApi;