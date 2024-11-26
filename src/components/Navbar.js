import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">RBAC Dashboard</h1>
        <div className="flex space-x-4">
          <Link to="/" className="">
            Dashboard
          </Link>
          <Link to="/users" className="">
            Users
          </Link>
          <Link to="/roles" className="">
            Roles
          </Link>
          <Link to="/permissions" className="">
            Permissions
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
