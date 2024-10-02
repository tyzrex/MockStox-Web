import RegisterForm from "@/components/forms/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex container items-center text-white justify-center py-12 h-full min-h-screen">
      <div className="mx-auto grid md:w-[450px] gap-6 bg-mockstox-primary p-5 md:p-10 rounded-3xl">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">
            Welcome to <span className="text-primary">MockStox</span>
          </h1>
          <p className="text-balance text-muted-foreground">
            Enter user details below to register an account
          </p>
        </div>
        <RegisterForm />
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="#" className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
