import type { NextPage } from 'next'
import MainDashboardLayout from '../components/Layouts/MainDashboardLayout';

const Home: NextPage = () => {
  return (
    <div>
      <MainDashboardLayout><div className='text-2xl font-display'>Dashboard</div></MainDashboardLayout>
    </div>
  )
}

export default Home
