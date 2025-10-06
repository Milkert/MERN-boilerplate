import api from "../config/api";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (loginData: { email: string; password: string }) => {
      return api.post("/login", loginData);
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      email,
      password,
    });
  };

  return (
    <>
      <div className="mt-28 w-full flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <h1 className="text-lg text-center mb-6">Welcome back!</h1>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main-color focus:border-main-color"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main-color focus:border-main-color"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="mb-10 w-full bg-main-color text-white py-2 px-4 rounded-md hover:bg-main-hover-color focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
          <div className="justify-center flex">
            <p>Don't have an account?</p>
            <Link to="/signup" className="font-bold ml-2 hover:text-main-hover-color text-main-color">
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
