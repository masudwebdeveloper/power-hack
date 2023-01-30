import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [check, setCheck] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleCheck = () => {
    setCheck(!check);
  };

  const { register, handleSubmit } = useForm();

  const handleSignIn = (data) => {
    const { email, password } = data;
    const userData = {
      email,
      password,
    };
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.token){
          localStorage.setItem('token', data.token)
          navigate('/billingpage')
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="">
      <div className="lg:max-w-[1350px] mx-auto py-10">
        <div className="md:w-1/4 rounded-sm mx-auto text-center bg-white shadow-2xl py-5">
          <h2 className="text-gray-700 font-bold text-xl">Please Login</h2>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <input
              type="email"
              name="email"
              className="input text-xs input-bordered w-4/5 py-2 px-4 rounded mt-3"
              placeholder="email"
              required
              {...register("email")}
            />
            <input
              type="password"
              name="password"
              className="input text-xs input-bordered w-4/5 py-2 px-4 rounded mt-3"
              placeholder="Password"
              required
              {...register("password")}
            />
            <p className="text-red-500">
              <small>{error}</small>
            </p>
            <div className="border-t-2 mt-5 w-4/5 mx-auto"></div>
            <div className="flex w-4/5 justify-between mt-4 mx-auto">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="check"
                  id="purmition"
                  className="mr-1 w-5"
                  onClick={handleCheck}
                />
                <label
                  htmlFor="purmition"
                  className="text-start text-xs font-light"
                >
                  Remember Me
                </label>
              </div>
              <button className="text-xs">Forgot Password?</button>
            </div>
            <button
              type="submit"
              href="#_"
              className="px-5 py-2 mt-4 relative rounded group text-white font-medium inline-block w-4/5"
              disabled={check}
            >
              <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
              <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
              <span className="relative">Login</span>
            </button>
          </form>
          <div className="flex items-center justify-center mt-5">
            <div className="w-1/5 h-[2px] bg-gray-400"></div>
            <div className="mx-5">Or Join With</div>
            <div className="w-1/5 h-[2px] bg-gray-400"></div>
          </div>

          <div className="mt-2">
            <p className="inline mr-2">Don't have an Account</p>
            <Link to="/register" className="text-blue-600 underline">
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
