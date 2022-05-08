import acuApi from '../utils/acu';

const AuthApi = {
  login: async (props: {email: string, password: string}) => {
    try {
      const response = await acuApi.post(`/api/login`, {
        email: props.email,
        password: props.password,
      });

      console.log(response.data);

      return response.data;
    } catch (error: any) {
      console.log(error.response);
    }
  }
};

export default AuthApi;