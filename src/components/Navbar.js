import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">RBAC Dashboard</h1>
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/users" className="hover:underline">
            Users
          </Link>
          <Link to="/roles" className="hover:underline">
            Roles
          </Link>
          <Link to="/permissions" className="hover:underline">
            Permissions
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
