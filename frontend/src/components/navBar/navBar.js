const NavBar = ({ logout }) => {
  const hasToken = Boolean(window.localStorage.getItem("token"));

  const renderButton = () => {
    if (!hasToken) {
      return (
        <a
          className="absolute top-2 right-2 btn font-lobster text-green-500 bg-white hover:bg-slate-200 text-right hover:text-green-700 text-1xl border-none"
          href="/login"
          data-cy="navbar-login"
          id="logo-link"
        >
          Login
        </a>
      );
    } else if (hasToken) {
      return (
        <>
          <a
            className="absolute top-2 right-2 btn font-lobster text-green-500 bg-white hover:bg-slate-200 text-right hover:text-green-700 text-1xl border-none"
            onClick={logout}
            href="/"
            data-cy="navbar-logout"
            id="logo-link"
          >
            Logout
          </a>
          <a
            className="absolute top-2 right-28 btn font-lobster text-green-500 bg-white hover:bg-slate-200 text-right hover:text-green-700 text-1xl border-none"
            href="/signup"
            data-cy="navbar-saved"
            id="logo-link"
          >
            Trips
          </a>
        </>
      );
    }
  };

  return (
    <div className="navbar bg-green-500 fixed w-full top-0">
      <h1 className="text-white text-3xl font-bold ml-6">Ecoliday</h1>
      {/* <a
        className="absolute top-2 right-2 btn font-lobster text-green-500 bg-white hover:bg-slate-200 text-right hover:text-green-700 text-1xl border-none"
        onClick={hasToken ? logout : null}
        href={hasToken ? "/" : "/login"}
        data-cy="navbar-login-logout"
        id="logo-link"
      >
        {hasToken ? "Logout" : "Login"}
      </a> */}
      {renderButton()}
    </div>
  );
};

export default NavBar;
