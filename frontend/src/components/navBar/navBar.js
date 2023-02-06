import React, { useEffect, useState } from "react";

const NavBar = () => {
  return (
    <>
      <div className="navbar bg-green-500 fixed w-full top-0">
        <h1 className=" text-white text-3xl font-bold ml-6">
          Ecoliday {console.log(window.localStorage.getItem("token"))}
        </h1>
        <a
          className="btn font-lobster text-green-500 bg-white hover:bg-slate-200 text-right hover:text-green-700 text-3xl border-none"
          href="/login"
          id="logo-link"
        >
          Login
        </a>
      </div>
    </>
  );
};

export default NavBar;
