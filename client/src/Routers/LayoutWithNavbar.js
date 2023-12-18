import Navbar from "../layouts/NavBar/NavBar";
function LayoutWithNavbar({ children }) {

  return (
    <>
      <div>
        <Navbar/>
        {children}
      </div>
    </>
  );
}

export default LayoutWithNavbar;