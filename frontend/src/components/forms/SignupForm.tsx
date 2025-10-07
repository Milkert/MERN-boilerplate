"use client";

import { signupSchema } from "../../lib/zodSchemas";
import api from "../../config/api";

import { Button } from "../shadcn/button";
import { Input } from "../shadcn/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../shadcn/form";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../shadcn/tooltip";
import { Info } from "lucide-react";

import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  // Define your form.
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (signupData: { name: string; email: string; password: string }) => {
      return api.post("/signup", signupData);
    },
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (error) => {
      const err = error as AxiosError<{ nameError?: string; emailError?: string; passwordError?: string }>;
      if (err.response?.data.nameError) {
        form.setError("name", { message: err.response?.data.nameError });
      }
      if (err.response?.data.emailError) {
        form.setError("email", { message: err.response?.data.emailError });
      }
      if (err.response?.data.passwordError) {
        form.setError("password", { message: err.response?.data.passwordError });
      }
    },
  });

  // Define a submit handler
  function onSubmit(values: z.infer<typeof signupSchema>) {
    mutation.mutate({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-lg">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your firstname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} type="email" />
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
              <div className="flex items-center gap-2">
                <FormLabel>
                  Password <span className="text-red-500">*</span>
                </FormLabel>
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Must be at least 8 characters and include letters and numbers</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <FormControl>
                <Input placeholder="••••••••" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Confirm password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="••••••••" {...field} type="password" />
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

export default SignupForm;
