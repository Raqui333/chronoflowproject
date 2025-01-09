import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const API_URL = process.env.API_URL;

declare module 'next-auth' {
  interface User {
    access_token: string;
    username: string;
    id: string;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    access_token: string;
    username: string;
    id: string;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'username',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'password',
        },
      },
      async authorize(credentials, _req) {
        const res = await fetch(API_URL + '/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();

        if (res.ok && data) return data;

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
        token.id = user.id;
        token.username = user.username;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.access_token = token.access_token as string;
      session.user.username = token.username as string;
      session.user.id = token.id as string;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
