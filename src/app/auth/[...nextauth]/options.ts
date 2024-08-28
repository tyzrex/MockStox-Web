import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        try {
          // const response = await PostRequest("auth/jwt/create/",);
          const response = await fetch("auth/jwt/create", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          return data;
        } catch (err: any) {
          switch (err.status) {
            case 400:
            case 401:
              throw err;
            case 404:
              throw new Error("User not found");
            default:
              throw new Error("Something went wrong");
          }
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/signout",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token as any;

      return session;
    },

    async jwt({ token, user, trigger, session, account }) {
      if (user) {
        return { ...token, ...user };
      }

      if (trigger === "update" && session) {
        return { ...token, ...session.user };
      }

      const userInfo = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}user/info`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
          cache: "default",
          next: {
            tags: ["user-info"],
          },
        }
      );

      const info = await userInfo.json();
      // console.log(info);
      const decodedJWT = jwtDecode(token.access as string);
      // console.log(decodedJWT);
      token.name = info.name;
      token.email = info.email;
      token.accessExpireTime = decodedJWT.exp;

      return token;
    },
  },
};
