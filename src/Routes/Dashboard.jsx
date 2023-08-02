import { FaHome } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Pages/Provider/AuthProvider';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setUsers(data);
      });
  }, []);


  const currentUserEmail = user?.email;

  const currentUser = users.find(user => user.email === currentUserEmail);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <Outlet />
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          {currentUser && currentUser.role === 'admin' &&
            <div>
              <li><NavLink to='/dashboard/manageclass'>Manage Classes</NavLink></li>
              <li><NavLink to='/dashboard/alluser'>Manage Users</NavLink></li>
            </div>
          }
          {currentUser && currentUser.role === "instructor" && <li><NavLink to='/dashboard/addclass'>Add Class</NavLink></li>}

          { currentUser && currentUser.role === 'student' &&
            <div>
              <li><NavLink to='/dashboard/myselected'>My Selected Class</NavLink></li>
              <li><NavLink to='/dashboard/enrolled'>My Enrolled Class</NavLink></li>
              </div>}

          {/* common */}
          <div className="divider"></div>
          <li><NavLink to='/'><FaHome />Home</NavLink></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
