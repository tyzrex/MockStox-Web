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
import { ChevronRight } from "lucide-react";
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

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(registerUser)} className="space-y-4">
          <RHFInput<RegisterSchemaType>
            name="username"
            type="text"
            placeHolder="Enter your username"
            formLabel="Username"
            className="w-full mt-2"
          />

          <RHFInput<RegisterSchemaType>
            name="email"
            className="w-full mt-2"
            type="email"
            placeHolder="Enter your email"
            formLabel="Email"
          />

          <RHFInput<RegisterSchemaType>
            className="w-full mt-2"
            name="password"
            type="password"
            placeHolder="Enter your password"
            formLabel="Password"
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 group px-4 tracking-tighter text-white bg-brand-primary"
          >
            {isSubmitting ? (
              <ButtonLoader />
            ) : (
              <>
                Sign Up
                <ChevronRight className="inline-flex justify-center items-center w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
