"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function NextAuthProvider(props: {
  children: React.ReactNode;
  session?: Session;
}) {
  return (
    <SessionProvider session={props.session}>{props.children}</SessionProvider>
  );
}
