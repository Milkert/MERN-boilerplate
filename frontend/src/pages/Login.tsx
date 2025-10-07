import LoginForm from "../components/forms/LoginForm";

import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="mt-28 w-full flex items-center gap-y-5 flex-col">
      <LoginForm />
      <p>
        Don't have an account? &nbsp;
        <Link to="/signup" className="text-bold text-main-color">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
