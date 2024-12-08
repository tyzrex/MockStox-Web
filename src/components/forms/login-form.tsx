"use client";

import { LoginSchemaType, loginSchema } from "@/schema/login-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import RHFInput from "../rhf-components/rhf-input";
import { Button } from "../ui/button";
import ButtonLoader from "../ui/button-loader";
import { toast } from "sonner";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
export default function LoginForm() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const router = useRouter();

  async function loginUser(data: LoginSchemaType) {
    const response = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (response?.error === null) {
      toast.success("Login Success");
      router.replace("/dashboard");
    } else {
      toast.error("Invalid Credentials");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(loginUser)} className="space-y-4">
          <RHFInput<LoginSchemaType>
            name="username"
            type="text"
            placeHolder="Enter your username"
            formLabel="Username"
            className="w-full mt-2 px-3 py-4 text-white bg-transparent outline-none  focus:border-pink-600/50 shadow-sm rounded-lg border-white/20 border-[1px]"
          />

          <RHFInput<LoginSchemaType>
            name="password"
            type="password"
            placeHolder="Enter your password"
            formLabel="Password"
            className="w-full mt-2 px-3 py-4 text-white bg-transparent outline-none  focus:border-pink-600/50 shadow-sm rounded-lg border-white/20 border-[1px]"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 group px-4 py-4 font-geist tracking-tighter text-xl text-white font-medium bg-purple-200/10 transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] hover:bg-transparent/10 active:bg-purple-600 rounded-lg duration-150"
          >
            {isSubmitting ? (
              <ButtonLoader />
            ) : (
              <>
                Sign In
                <ChevronRight className="inline-flex justify-center items-center w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
              </>
            )}
          </button>
        </form>
      </Form>
    </div>
  );
}
