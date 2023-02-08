import React, { useState } from "react";
import NavBar from "../navBar/navBar";

const SignUpForm = ({ navigate }) => {
  const handleChange = (setFunction) => {
    return (event) => {
      setFunction(event.target.value);
    };
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch("/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then((response) => {
      if (response.status === 201) {
        console.log("success");
        navigate("/login");
      } else {
        console.log("error");
        navigate("/signup");
      }
    });
  };

  return (
    <>
      <NavBar />
      <div id="main-container" className="pt-16 h-full">
        <div className="flex justify-center">
          <div className="flex flex-col p-10 items-center mt-20 w-96">
            <div className="w-fit text-4xl mb-10 font-semibold">Sign Up</div>
            <form onSubmit={handleSubmit} className="w-full">
              <div
                id="signup-email-container"
                className="text-xl w-full mx-auto mb-4"
              >
                <label for="signup-email" className="text-base">
                  Email:
                </label>
                <br />
                <input
                  id="signup-email"
                  name="signup-email"
                  className="pl-1 border-2 rounded w-full"
                  data-cy="email"
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
                  className="pl-1 border-2 rounded w-full"
                  data-cy="password"
                  type="password"
                  value={password}
                  onChange={handleChange(setPassword)}
                />
              </div>
              <div className="flex flex-row justify-between items-center">
                <input
                  id="signup-submit"
                  className="btn bg-green-600 border-0 hover:bg-green-700 rounded-full"
                  data-cy="signup-submit"
                  type="submit"
                  value="submit"
                />
                <a href="/login" className="text-blue-600">
                  Already have an account?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
