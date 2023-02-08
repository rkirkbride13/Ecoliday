import React, { useState } from "react";
import NavBar from "../navBar/navBar";

const SignUpForm = ({ navigate }) => {
  const handleChange = (setFunction) => {
    return (event) => {
      setEmailUsed(false);
      setFunction(event.target.value);
    };
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailUsed, setEmailUsed] = useState(false);

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
        navigate("/login");
      } else {
        setEmailUsed(true);
      }
    });
  };

  const invalidDetails = () => {
    if (emailUsed) {
      return (
        <div className="text-white text-base font-semibold">
          Email already in use
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <NavBar links={[]} />
      <div id="main-container" className="pt-16">
        <div className="flex justify-center">
          <div className="flex flex-col p-10 items-center mt-20 w-96">
            <div className="w-fit text-white text-4xl mb-10 font-semibold">
              Sign Up
            </div>
            {invalidDetails()}
            <form onSubmit={handleSubmit} className="w-full">
              <div
                id="signup-email-container"
                className="text-xl w-full mx-auto mb-4"
              >
                <label htmlFor="signup-email" className="text-base">
                  Email:
                </label>
                <br />
                <input
                  id="signup-email"
                  name="signup-email"
                  className="pl-1 focus:outline-none focus:border-sky-500 focus:invalid:border-red-600 border-2 rounded w-full peer"
                  data-cy="email"
                  type="text"
                  required
                  pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                  value={email}
                  onChange={handleChange(setEmail)}
                />
                <p className="invisible peer-focus:peer-invalid:visible text-xs pl-1 pt-1 text-white">
                  Invalid email
                </p>
              </div>

              <div
                id="login-password-container"
                className="mb-8 text-xl mx-auto w-full"
              >
                <label htmlFor="login-password" className="text-base">
                  Password:
                </label>
                <br />
                <input
                  id="login-password"
                  name="login-password"
                  className="pl-1 focus:outline-none focus:border-sky-500 focus:invalid:border-red-600 border-2 rounded w-full peer"
                  data-cy="password"
                  type="password"
                  required
                  value={password}
                  onChange={handleChange(setPassword)}
                />
                <p className="invisible peer-focus:peer-invalid:visible text-xs pl-1 pt-1 text-white">
                  Enter a password
                </p>
              </div>

              <div className="flex flex-row justify-between items-center">
                <input
                  id="signup-submit"
                  className="btn bg-transparent hover:bg-transparent hover:border-white border-white rounded-full"
                  data-cy="signup-submit"
                  type="submit"
                  value="submit"
                />
                <a href="/login" className="text-white">
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
