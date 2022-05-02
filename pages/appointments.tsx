import type { NextPage } from 'next'
import MainDashboardLayout from '../components/Layouts/MainDashboardLayout';
import AppointmentsTable from '../modules/Appointments/Datatable/AppointmentsTable';

const Appointments: NextPage = () => {
  return (
    <div>
      <MainDashboardLayout>
        <div className='text-2xl font-display mb-6'>Appointments</div>
        <section className="w-full">
          <AppointmentsTable />
        </section>
      </MainDashboardLayout>
    </div>
  )
}

export default Appointments
