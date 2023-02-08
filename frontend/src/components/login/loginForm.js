import React, { useState } from "react";
import NavBar from "../navBar/navBar";

const LoginForm = ({ navigate }) => {
  const handleChange = (setFunction) => {
    return (event) => {
      setFunction(event.target.value);
    };
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/tokens", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.status !== 201) {
      console.log("failed login");
      navigate("/login");
    } else {
      console.log("successful login");
      let data = await response.json();
      window.localStorage.setItem("token", data.token);
      navigate("/");
    }
  };

  return (
    <>
      <NavBar />
      <div id="main-container" className="pt-16 h-full">
        <div className="flex justify-center">
          <div className="flex flex-col p-20 items-center mt-20">
            <div className="w-fit text-4xl mb-10 font-semibold">Login</div>
            <form onSubmit={handleSubmit}>
              <div
                id="login-email-container"
                className="text-xl w-full mx-auto mb-4"
              >
                <label for="login-email" className="text-base">
                  Email:
                </label>
                <br />
                <input
                  id="login-email"
                  name="login-email"
                  className="pl-1 border-2 rounded w-full"
                  data-cy="login-email"
                  type="text"
                  value={email}
                  onChange={handleChange(setEmail)}
                />
              </div>
              <div
                id="login-password-container"
                className="mb-8 text-xl mx-auto w-full"
              >
                <label for="login-password" className="text-base">
                  Password:
                </label>
                <br />
                <input
                  id="login-password"
                  name="login-password"
                  className="pl-1 border-2 rounded peer w-full"
                  data-cy="login-password"
                  type="password"
                  value={password}
                  onChange={handleChange(setPassword)}
                />
              </div>
              <div>
                <input
                  id="login-submit"
                  className="btn bg-green-600 border-0 hover:bg-green-700 rounded-full"
                  data-cy="login-submit"
                  type="submit"
                  value="submit"
                />
                <a href="/signup" className="ml-6 text-blue-600">
                  Don't have an account?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
