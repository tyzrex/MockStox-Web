"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import RHFInput from "../rhf-components/rhf-input";
import { Button } from "../ui/button";
import ButtonLoader from "../ui/button-loader";
import {
  registerSchema,
  type RegisterSchemaType,
} from "@/schema/register-schema";
import { fetchWrapper } from "@/services/request-handler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function RegisterForm() {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const router = useRouter();

  async function registerUser(data: RegisterSchemaType) {
    try {
      const response = await fetchWrapper("auth/users/", {
        method: "POST",
        body: {
          username: data.username,
          email: data.email,
          password: data.password,
          re_password: data.password,
        },
        validateStatus: (status) => status === 201,
        retries: 0,
      });
      if (response.success) {
        toast.success("Registration Success");
        router.replace("/login");
      } else {
        toast.error("Registration Failed");
      }
    } catch (err) {
      console.log(err);
    }
  }

  console.log(errors);
  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(registerUser)} className="space-y-4">
          <RHFInput<RegisterSchemaType>
            name="username"
            type="text"
            placeHolder="Enter your username"
            formLabel="Username"
            className="w-full mt-2 px-3 py-5 text-gray-500 bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg"
          />

          <RHFInput<RegisterSchemaType>
            name="email"
            className="w-full mt-2 px-3 py-5 text-gray-500 bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg"
            type="email"
            placeHolder="Enter your email"
            formLabel="Email"
          />

          <RHFInput<RegisterSchemaType>
            className="w-full mt-2 px-3 py-5 text-gray-500 bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg"
            name="password"
            type="password"
            placeHolder="Enter your password"
            formLabel="Password"
          />

          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full font-geist tracking-tighter text-center rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70 flex items-center justify-center gap-2"
          >
            {isSubmitting && <ButtonLoader />}
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
    </>
  );
}
