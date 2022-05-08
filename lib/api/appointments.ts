import acuApi from '../utils/acu';
import { SERVER_BASE_URL } from "../utils/constants";

const AppointmentsApi = {
  all: () =>
    acuApi.get(`${SERVER_BASE_URL}api/appointments/upcoming`),
};

export default AppointmentsApi;