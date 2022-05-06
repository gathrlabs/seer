import type { NextPage } from 'next'
import { useEffect } from 'react';
import { getProviders, useSession, signIn, signOut } from 'next-auth/react'
import GuestLayout from '../../components/Layouts/GuestLayout';
import DefaultButton from '../../components/DefaultButton';
import { APP_NAME } from '../../lib/utils/constants';
import { useRouter } from "next/router";

const Login: NextPage = ({ providers }) => {
    const { query } = useRouter();
    const { data: session, status } = useSession();
    useEffect(() => {
        if (query.signInToken) {
            signIn(providers.credentials.id, { signInToken: query.signInToken, callbackUrl: '/appointments' })
        }
    }, []);
    console.log(status);
    return (
        <div>
            <GuestLayout>
                <section className="w-full">
                    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-xs w-full space-y-8">
                            {/* <div>{providers.credentials.name}</div> */}
                            <div>{query.token}</div>
                            <div>
                                <h2 className="mt-6 text-center font-display text-4xl">{APP_NAME}</h2>
                            </div>
                            <div>
                                <h3 className="mt-24 text-center font-sans text-lg text-slate-800">Login to your account</h3>
                            </div>
                            <form className="mt-8 space-y-6" action="#" method="POST">
                                <input type="hidden" name="remember" defaultValue="true" />
                                <div className="rounded-md shadow-sm space-y-2">
                                    <div>
                                        <label htmlFor="email-address" className="sr-only">
                                            Email address
                                        </label>
                                        <input
                                            id="email-address"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-200 focus:z-10 sm:text-sm"
                                            placeholder="Email address"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="sr-only">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-200 focus:z-10 sm:text-sm" placeholder="Password"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-slate-600 hover:text-slate-500">
                                            Forgot your password?
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <DefaultButton onPress={() => signIn(providers.credentials.id, { email: "jsmith@example.com", callbackUrl: '/appointments' })} title='Login' />
                                    <DefaultButton onPress={() => signOut()} title='Login' />
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </GuestLayout>
        </div>
    )
}

export default Login

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers
        },
    }
}
