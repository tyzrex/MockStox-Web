import LoginForm from "@/components/forms/login-form";
import Link from "next/link";
import React from "react";

export default function FUILoginWithListedProvider() {
  return (
    <main
      style={{
        background:
          "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
      }}
      className="w-full min-h-screen flex flex-col items-center justify-center sm:px-4 relative"
    >
      <div className="max-w-sm w-full text-gray-600 space-y-8">
        <div className="text-left">
          <img
            src="https://farmui.com/logo.svg"
            width={100}
            className="mr-auto rounded-full"
          />
          <div className="mt-5 space-y-2 mr-auto">
            <h3 className="text-gray-200 text-2xl font-normal sm:text-3xl tracking-tighter font-geist">
              Log in to your account
            </h3>
            <p className="text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="register"
                className="font-medium text-purple-300 hover:text-purple-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
