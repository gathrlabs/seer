import { Session } from "inspector";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import AuthApi from "../../../lib/api/auth";

export default NextAuth({
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      user && (token.user = user)
      return token
    },
    session: async ({ session, token }) => {
      if (token.user) session.user = token.user
      return session
    },
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const user = await AuthApi.login({ email: credentials.email, password: credentials.password });
        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
  },
  debug: true,
})