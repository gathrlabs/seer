import Head from 'next/head'
import { APP_NAME } from '../../lib/utils/constants'

type LayoutProps = {
  children: React.ReactNode
}

function GuestLayout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{ APP_NAME } | Powering self determination in health</title>
      </Head>
      <div className="h-screen overflow-auto bg-orange-50 text-slate-900 px-2">
          <div>{ APP_NAME }</div>
        <main className="max-w-6xl mx-auto py-12">{children}</main>
      </div>
    </>
  )
}

export default GuestLayout
