import api from "../config/api";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../config/api";
import { Link } from "react-router-dom";
import { MdOutlineError } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (loginData: { email: string; password: string }) => {
      return api.post("/login", loginData);
    },
    onSuccess: () => {
      setEmailError("");
      setPasswordError("");

      navigate("/dashboard");
    },
    onError: (error: { response?: { data?: { emailError?: string; passwordError?: string } } }) => {
      setEmailError(error.response?.data?.emailError || "");
      setPasswordError(error.response?.data?.passwordError || "");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
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
            <div className="relative">
              <input
                type="email"
                required
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-main-color focus:border-main-color ${
                  emailError ? "border-error-color" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {emailError && <MdOutlineError className="absolute right-3 top-1/2 -translate-y-1/2 text-error-color" size={20} />}
            </div>
            {emailError && <p className="text-error-color text-xs mt-1">{emailError}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                }}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-main-color focus:border-main-color ${
                  passwordError ? "border-error-color" : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              {passwordError && <MdOutlineError className="absolute right-3 top-1/2 -translate-y-1/2 text-error-color" />}
            </div>
            {passwordError && <p className="text-error-color text-xs mt-1">{passwordError}</p>}
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
