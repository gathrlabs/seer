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
        console.log('Authorize function');
        const token = await AuthApi.login();
        console.log('Token:', token);

        // console.log('Signing in using password strategy.');
        // Add logic here to look up the user from the credentials supplied
        // const res = await fetch()
        // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }
        // console.log(req);
        // if (user) {
        //   // Any object returned will be saved in `user` property of the JWT
        //   return user
        // } else {
        //   // If you return null then an error will be displayed advising the user to check their details.
        //   return null
  
        //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        // }
      }
    })
  ],
  pages: {
      signIn: '/auth/login',
  },
  debug: true,
})