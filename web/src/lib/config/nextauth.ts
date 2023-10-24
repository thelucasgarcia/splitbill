import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { AxiosError } from 'axios';
import User from '../models/user';
import axiosInstance from './axios';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'Api Login',
      type: 'credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return axiosInstance.post<User>("auth/login",
          {
            username: credentials?.username,
            password: credentials?.password,
            expiresInMins: 60 * 8
          }
        ).then((res) => {
          return {
            id: String(res.data.id),
            name: res.data.firstName + ' ' + res.data.lastName,
            email: res.data.email,
            image: res.data.image
          }
        }).catch((res: AxiosError<{ message: string }>) => {
          throw new Error(res.response?.data.message || res.message);
        });
      },
    }),
  ],
  logger: {
    error(code, metadata) {
      console.error(code, metadata)
    },
    warn(code) {
      console.warn(code)
    },
    debug(code, metadata) {
      console.debug(code, metadata)
    }
  }
};
