import Head from 'next/head'
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import MainNav from '../Navigation/MainNav'
import { APP_NAME } from '../../lib/utils/constants'
import { getProviders, useSession, signIn } from 'next-auth/react'
import { useEffect } from 'react'

type LayoutProps = {
  children: React.ReactNode
}

function MainDashboardLayout({ children }: LayoutProps) {
  const router = useRouter();

  useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/login');
    },
  })

  return (
    <>
      <Head>
        <title>{APP_NAME} | Powering self determination in health</title>
      </Head>
      <div className="h-screen overflow-auto bg-orange-50 text-slate-900 px-2">
        <Toaster
          toastOptions={{
            duration: 5000,
          }}
        />
        <MainNav />
        <main className="max-w-6xl mx-auto py-12">{children}</main>
      </div>
    </>
  )
}

export default MainDashboardLayout
