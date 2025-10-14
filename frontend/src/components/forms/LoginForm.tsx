import api from "../../config/api";
import { loginSchema } from "../../lib/zodSchemas";
import { useAuth } from "../../context/AuthContext.tsx";

import { Button } from "../shadcn/button";
import { Input } from "../shadcn/input";
import { PasswordInput } from "../shadcn/password-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../shadcn/form";

import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  // Define form
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (loginData: { email: string; password: string }) => {
      const res = await api.post("/login", loginData);

      return res.data;
    },
    onSuccess: (user) => {
      setUser(user);
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

  // Define a submit handler
  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutation.mutate({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-lg">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="••••••••" {...field} />
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
