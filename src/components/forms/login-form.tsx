"use client";

import { LoginSchemaType, loginSchema } from "@/schema/login-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import RHFInput from "../rhf-components/rhf-input";
import { Button } from "../ui/button";
import ButtonLoader from "../ui/button-loader";
export default function LoginForm() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  async function loginUser() {}
  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(loginUser)} className="space-y-4 p-10">
          <RHFInput<LoginSchemaType>
            name="username"
            type="text"
            placeHolder="Enter your username"
            formLabel="Username"
          />

          <RHFInput<LoginSchemaType>
            name="password"
            type="password"
            placeHolder="Enter your password"
            formLabel="Password"
          />

          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting && <ButtonLoader />}
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </>
  );
}
