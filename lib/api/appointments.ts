import acuApi from '../utils/acu';
import { SERVER_BASE_URL } from "../utils/constants";

const AppointmentsApi = {
  all: () =>
    acuApi.get(`${SERVER_BASE_URL}api/appointments/upcoming`),

  update: ({appointmentId}: {appointmentId: String}) =>
    acuApi.put(`${SERVER_BASE_URL}api/appointments/${appointmentId}`),

  sendConfirmationEmail: ({appointmentIds}: {appointmentIds: []}) =>
    acuApi.post(`${SERVER_BASE_URL}api/appointments/send-confirmation-email`, {
      appointment_ids: appointmentIds,
    }),
  
  assignForm: ({appointmentId, formId}: {appointmentId: String, formId: String}) =>
    acuApi.post(`${SERVER_BASE_URL}api/appointments/${appointmentId}/assign-form`, {
      form_id: formId,
    }),
};

export default AppointmentsApi;