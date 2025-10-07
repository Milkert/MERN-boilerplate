import api from "../config/api";

import LoginForm from "../components/forms/LoginForm";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { MdOutlineError } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  return (
    <div className="mt-28 w-full flex items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default Login;
