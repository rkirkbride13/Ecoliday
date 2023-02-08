const NavBar = (props) => {
  const renderDropdown = () => {
    if (props.links.length !== 0)
      return (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="w-10 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current scale-150 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            {props.links.map((link) => {
              return (
                <li>
                  <a href={link.href} onClick={link.handleClick}>
                    {link.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      );
  };

  return (
    <div className="fixed top-0 navbar bg-green-500 w-full z-50 justify-between">
      <a
        href="/"
        className="btn btn-ghost text-white text-3xl font-bold normal-case"
      >
        <span className="material-symbols-outlined mr-2 text-3xl">eco</span>{" "}
        Ecoliday
      </a>
      {renderDropdown()}
    </div>
  );
};

export default NavBar;
