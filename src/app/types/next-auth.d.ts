import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      access: JWT;
      accessExpireTime: any;
      id: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    access: JWT;
    accessExpireTime: any;
  }
}
