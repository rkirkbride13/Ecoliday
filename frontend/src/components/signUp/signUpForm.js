import React, { useState } from "react";

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
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div id="email" className="mb-5 text-xl mx-auto">
          <label for="email"></label>
          <br />
          <input
            id="email-input"
            className="pl-1 border-2 rounded peer"
            data-cy="email"
            type="text"
            value={email}
            onChange={handleChange(setEmail)}
          />
        </div>
        <div id="password" className="mb-5 text-xl mx-auto">
          <label for="password"></label>
          <br />
          <input
            id="password-input"
            className="pl-1 border-2 rounded peer"
            data-cy="password"
            type="password"
            value={password}
            onChange={handleChange(setPassword)}
          />
        </div>
        <div>
          <input
            id="signup-submit"
            className="btn bg-green-600 border-0 hover:bg-green-700 rounded-full"
            data-cy="signup-submit"
            type="submit"
            value="submit"
          />
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
