"use client";

import { loginSchema } from "../../lib/zodSchemas";
import api from "../../config/api";

import { AxiosError } from "axios";

import { Button } from "../shadcn/button";
import { Input } from "../shadcn/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../shadcn/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (loginData: { email: string; password: string }) => {
      return api.post("/login", loginData);
    },
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (error) => {
      const err = error as AxiosError<{ emailError?: string; passwordError?: string }>;
      if (err.response?.data.emailError) {
        form.setError("email", { message: err.response?.data.emailError });
      }
      if (err.response?.data.passwordError) {
        form.setError("password", { message: err.response?.data.passwordError });
      }
    },
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    mutation.mutate({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
