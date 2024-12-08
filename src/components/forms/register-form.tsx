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
import { RegisterNewUser } from "@/services/api/auth/auth-actions";
import { showErrorToasts } from "@/lib/utils";
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
    const response = await RegisterNewUser(data);
    if (response.success) {
      toast.success(response.message);
      router.replace("/login");
    } else {
      console.log(response);
      showErrorToasts(response.errorData);
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
            className="w-full mt-2 px-3 py-5 text-white border-neutral-800 bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg"
          />

          <RHFInput<RegisterSchemaType>
            name="email"
            className="w-full mt-2 px-3 py-5 text-white border-neutral-800 bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg"
            type="email"
            placeHolder="Enter your email"
            formLabel="Email"
          />

          <RHFInput<RegisterSchemaType>
            className="w-full mt-2 px-3 py-5 text-white border-neutral-800 bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg"
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
