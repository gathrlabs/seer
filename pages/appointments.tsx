import type { NextPage } from 'next'
import DropdownButton from '../components/DropdownButton';
import MainDashboardLayout from '../components/Layouts/MainDashboardLayout';
import AppointmentsTable from '../modules/Appointments/Datatable/AppointmentsTable';
import { getProviders, useSession, signIn } from 'next-auth/react'
import { useEffect, useState } from 'react';
import AppointmentsApi from '../lib/api/appointments';

const Appointments: NextPage = () => {
  const [appointments, setAppointments] = useState(new Date());
  // figure out async useEffect.
  useEffect(() => {
  // declare the async data fetching function
  const fetchData = async () => {
    const {data: { data }} = await AppointmentsApi.all();
    setAppointments(data);
  };

  const result = fetchData()
    // make sure to catch any error
    .catch(console.error);;

  // what will be logged to the console?
  console.log(result);
  }, [])
  return (
    <div>
      <MainDashboardLayout>
        <div className='text-2xl font-sans font-medium text-slate-800'>Appointments</div>
        <section className="w-full">
          <div className='mb-4 w-full flex justify-end'>
            <DropdownButton options={[{ 'text': 'Attach Form', url: '/' }, { 'text': 'Send Confirmation Email', url: '/' }, { 'text': 'Cancel', url: '/' }]} title={'Actions'} />
          </div>
          <AppointmentsTable rowData={{ appointments }} />
        </section>
      </MainDashboardLayout>
    </div>
  )
}

export default Appointments
