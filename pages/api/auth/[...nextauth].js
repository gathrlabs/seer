import { Session } from "inspector";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import AuthApi from "../../../lib/api/auth";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      callbacks: {
        session: ({ session, token }) => {
          console.log(token);
          if (token) {
            session.id = token.id;
          }
          return session;
        },
      },
      secret: "test",
      async authorize(credentials, req) {
        const user = await AuthApi.login();
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