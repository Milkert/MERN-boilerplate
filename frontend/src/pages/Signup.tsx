import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../config/api";
import { Link } from "react-router-dom";
import { MdOutlineError } from "react-icons/md";

function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");

  // Error states
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [repasswordError, setRepasswordError] = useState<string>("");

  const mutation = useMutation({
    mutationFn: async (signupData: { email: string; password: string; name: string }) => {
      return api.post("/signup", signupData);
    },
    onSuccess: () => {
      setEmailError("");
      setPasswordError("");
      setNameError("");
      setRepasswordError("");
    },
    onError: (error: any) => {
      setEmailError(error.response?.data?.emailError || "");
      setPasswordError(error.response?.data?.passwordError || "");
      setNameError(error.response?.data?.nameError || "");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    if (password !== repassword) {
      setRepasswordError("Passwords do not match");
      return;
    }
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
          <h1 className="text-lg text-center mb-2">Create account!</h1>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Surname<span className="text-red-600"> *</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) setNameError("");
                }}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-main-color focus:border-main-color ${
                  nameError ? "border-error-color" : "border-gray-300"
                }`}
                placeholder="Enter your surname"
              />
              {nameError && <MdOutlineError className="absolute right-3 top-1/2 -translate-y-1/2 text-error-color" size={20} />}
            </div>
            {nameError && <p className="text-error-color text-xs mt-1">{nameError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email<span className="text-red-600"> *</span>
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                required
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
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password<span className="text-red-600"> *</span>
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
              {passwordError && <MdOutlineError className="absolute right-3 top-1/2 -translate-y-1/2 text-error-color" size={20} />}
            </div>
            {passwordError && <p className="text-error-color text-xs mt-1">{passwordError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="repassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password<span className="text-red-600"> *</span>
            </label>
            <div className="relative">
              <input
                type="password"
                id="repassword"
                required
                value={repassword}
                onChange={(e) => {
                  setRepassword(e.target.value);
                  if (repasswordError) setRepasswordError("");
                }}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-main-color focus:border-main-color ${
                  repasswordError ? "border-error-color" : "border-gray-300"
                }`}
                placeholder="Confirm password"
              />
              {repasswordError && <MdOutlineError className="absolute right-3 top-1/2 -translate-y-1/2 text-error-color" size={20} />}
            </div>
            {repasswordError && <p className="text-error-color text-xs mt-1">{repasswordError}</p>}
          </div>
          <button
            type="submit"
            className="mt-5 mb-10 w-full bg-main-color text-white py-2 px-4 rounded-md hover:bg-main-hover-color focus:outline-none focus:ring-2 focus:ring-offset-2"
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
