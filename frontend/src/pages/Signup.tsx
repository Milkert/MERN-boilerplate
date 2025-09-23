import api from "../config/api";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (loginData: { email: string; password: string; name: string }) => {
      return api.post("/signup", loginData);
    },
    onSuccess: (data) => {
      console.log("Signup successful:", data);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Signup failed:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      email,
      password,
      name,
    });
  };

  return (
    <>
      <div className="mt-28 w-full flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <h1 className="text-lg text-center mb-6">Create Account</h1>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Surname
              <span className="text-red-600"> *</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main-color focus:border-main-color"
              placeholder="Enter your surname"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
              <span className="text-red-600"> *</span>
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
              <span className="text-red-600"> *</span>
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
          <div className="mb-4">
            <label htmlFor="repassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
              <span className="text-red-600"> *</span>
            </label>
            <input
              type="password"
              id="repassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main-color focus:border-main-color"
              placeholder="Confirm password"
            />
          </div>
          <button
            type="submit"
            className="mb-10 w-full bg-main-color text-white py-2 px-4 rounded-md hover:bg-main-hover-color focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Register
          </button>
          <div className="justify-center flex">
            <p>Already have an account?</p>
            <Link to="/login" className="hover:text-hover-color ml-2 font-bold text-main-color hover:text-main-hover-color">
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
