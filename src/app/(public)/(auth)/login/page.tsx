import Image from "next/image";
import Link from "next/link";

import LoginForm from "@/components/forms/login-form";

export default function Page() {
  return (
    <div className="flex container items-center text-white justify-center py-12 h-full min-h-screen">
      <div className="mx-auto grid md:w-[450px] gap-6 bg-mockstox-primary p-5 md:p-10 rounded-3xl">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">
            Welcome back to <span className="text-primary">MockStox</span>
          </h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <LoginForm />
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
