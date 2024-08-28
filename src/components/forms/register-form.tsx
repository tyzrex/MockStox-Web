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
export default function RegisterForm() {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  async function registerUser() {}
  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(registerUser)} className="space-y-4 p-10">
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
