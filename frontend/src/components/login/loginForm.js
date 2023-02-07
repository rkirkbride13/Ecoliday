import React, { useState } from "react";

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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div id="login-email" className="mb-5 text-xl mx-auto">
          <label for="login-email"></label>
          <br />
          <input
            id="login-email-input"
            className="pl-1 border-2 rounded peer"
            data-cy="login-email"
            type="text"
            value={email}
            onChange={handleChange(setEmail)}
          />
        </div>
        <div id="login-password" className="mb-5 text-xl mx-auto">
          <label for="login-password"></label>
          <br />
          <input
            id="login-password-input"
            className="pl-1 border-2 rounded peer"
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
        </div>
      </form>
    </>
  );
};

export default LoginForm;
