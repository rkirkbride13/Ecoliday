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
    <div className="fixed top-0 navbar bg-green-500 w-full z-50">
      <h1 className="text-white text-3xl font-bold ml-6">
        <span className="material-symbols-outlined mr-2 text-3xl">eco</span>{" "}
        Ecoliday
      </h1>
      {renderButton()}
    </div>
  );
};

export default NavBar;
