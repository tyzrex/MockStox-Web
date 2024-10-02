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
        body: data,
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
          />

          <RHFInput<RegisterSchemaType>
            name="email"
            type="email"
            placeHolder="Enter your email"
            formLabel="Email"
          />

          <RHFInput<RegisterSchemaType>
            name="password"
            type="password"
            placeHolder="Enter your password"
            formLabel="Password"
          />

          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting && <ButtonLoader />}
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
    </>
  );
}
