const NavBar = (props) => {
  return (
    <>
      <div className="navbar bg-green-500 fixed w-full top-0">
        <h1 className=" text-white text-3xl font-bold ml-6">Ecoliday</h1>
        <input
          data-cy="travelFormSubmit"
          type="submit"
          value="Submit"
          className="btn bg-white border-0 text-green-500 rounded-full"
        />
      </div>
    </>
  );
};

export default NavBar;
