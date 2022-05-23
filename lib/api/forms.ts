import acuApi from '../utils/acu';
import { SERVER_BASE_URL } from "../utils/constants";

const FormsApi = {
  all: () =>
    acuApi.get(`${SERVER_BASE_URL}api/surveys`),
};

export default FormsApi;