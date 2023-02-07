// const NavBar = (props) => {
//   const renderButton = () => {
//     if (window.localStorage.getItem("token")) {
//       return (
//         <a
//           className="btn font-lobster text-green-500 bg-white hover:bg-slate-200 text-right hover:text-green-700 text-3xl border-none"
//           onClick={props.logout}
//           href="/login"
//           id="logo-link"
//         >
//           Logout
//         </a>
//       );
//     } else {
//       return (
//         <a
//           className="btn font-lobster text-green-500 bg-white hover:bg-slate-200 text-right hover:text-green-700 text-3xl border-none"
//           href="/login"
//           id="logo-link"
//         >
//           Login
//         </a>
//       );
//     }
//   };

//   return (
//     <>
//       <div className="navbar bg-green-500 fixed w-full top-0">
//         <h1 className=" text-white text-3xl font-bold ml-6">
//           Ecoliday {console.log(window.localStorage.getItem("token"))}
//         </h1>
//         {renderButton()}
//       </div>
//     </>
//   );
// };

// export default NavBar;

const NavBar = ({ logout }) => {
  const hasToken = Boolean(window.localStorage.getItem("token"));

  return (
    <div className="navbar bg-green-500 fixed w-full top-0">
      <h1 className="text-white text-3xl font-bold ml-6">Ecoliday</h1>
      <a
        className="absolute top-2 right-2 btn font-lobster text-green-500 bg-white hover:bg-slate-200 text-right hover:text-green-700 text-1xl border-none"
        onClick={hasToken ? logout : null}
        href={hasToken ? "/" : "/login"}
        data-cy="navbar-login-logout"
        id="logo-link"
      >
        {hasToken ? "Logout" : "Login"}
      </a>
    </div>
  );
};

export default NavBar;
