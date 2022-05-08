import type { NextPage } from 'next'
import DropdownButton from '../components/DropdownButton';
import MainDashboardLayout from '../components/Layouts/MainDashboardLayout';
import AppointmentsTable from '../modules/Appointments/Datatable/AppointmentsTable';
import { getProviders, useSession, signIn } from 'next-auth/react'
import { useEffect } from 'react';
import AppointmentsApi from '../lib/api/appointments';

const Appointments: NextPage = () => {
  useEffect(() => {
    const appointments = AppointmentsApi.all();
    console.log(appointments);
  }, [])
  return (
    <div>
      <MainDashboardLayout>
        <div className='text-2xl font-display mb-6'>Appointments</div>
        <section className="w-full">
          <div className='mb-4 w-full flex justify-end'>
            <DropdownButton options={[{ 'text': 'Attach Form', url: '/' }, { 'text': 'Send Confirmation Email', url: '/' }, { 'text': 'Cancel', url: '/' }]} title={'Actions'} />
          </div>
          <AppointmentsTable />
        </section>
      </MainDashboardLayout>
    </div>
  )
}

export default Appointments
