import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";


const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then({})
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className="navbar bg-black opacity-40 z-10 fixed text-white max-w-7xl">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/instructor'>Instructors</Link></li>
            <li><Link to='/classes'>classes</Link></li>
            <li><Link to='/'>Dashboard</Link></li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">Elite Sports</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/instructor'>Instructors</Link></li>
          <li><Link to='/classes'>classes</Link></li>
          <li><Link to='/dashboard'>Dashboard</Link></li>


        </ul>
      </div>
      <div className="navbar-end">
        <div >
          {
            user ? <div className="flex items-center">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} />
                </div>
              </label>

              <button onClick={handleLogOut} className="btn btn-ghost">Log Out</button>
            </div> : <>
              <Link className="btn btn-ghost" to='/login'>Login</Link>
            </>
          }
          {/* <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </label> */}
        </div>
      </div>
    </div>
  );
};

export default Header;