import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "../components/UserForm";
const baseUrl = process.env.REACT_APP_API_URL;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUsing, setSearchUsing] = useState("name");

  useEffect(() => {
    axios
      .get(`${baseUrl}/users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users", error));
  }, []);

  const handleAddUser = () => {
    setEditingUser(null);
    setOpenDialog(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setOpenDialog(true);
  };

  const handleDeleteUser = (id) => {
    axios
      .delete(`${baseUrl}/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => console.error("Error deleting user", error));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user[searchUsing]?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFormSubmit = () => {
    setOpenDialog(false);
    axios.get(`${baseUrl}/users`).then((response) => setUsers(response.data));
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="md:flex md:gap-4 md:content-center md:py-2 md:mb-1 grid gap-4 grid-cols-3 py-2 mb-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Users by selecting field in the adjacent dropdown..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
          onChange={handleSearchChange}
        />
        {/* Dropdown */}
        <select
          id="role"
          value={searchUsing}
          onChange={(e) => setSearchUsing(e.target.value)}
          required
          className="px-3 py-1 block rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="" disabled>
                Search Using
            </option>
          <option value="name">Name</option>
          <option value="email">Email</option>  
          <option value="role">Role</option>
          <option value="status">Status</option>
        </select>
        {/* Add User Button */}
        <button
          onClick={handleAddUser}
          className=" bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Add User
        </button>
      </div>

      {/* User List */}
<div className="grid gap-4">
  {/* Header (Hidden on small screens) */}
  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hidden sm:grid">
    <div>Name</div>
    <div>Email</div>
    <div>Role</div>
    <div>Status</div>
    <div>Actions</div>
  </div>

  {/* User Items */}
  {filteredUsers.map((user) => (
    <div
      key={user.id}
      className="grid grid-cols-1 sm:grid-cols-5 gap-4 bg-white rounded-lg shadow p-4 hover:bg-gray-100"
    >
      {/* Name */}
      <div className="sm:col-span-1">
        <div className="block sm:hidden font-medium text-gray-800">Name:</div>
        <div className="text-gray-800">{user.name}</div>
      </div>

      {/* Email */}
      <div className="sm:col-span-1">
        <div className="block sm:hidden font-medium text-gray-800">Email:</div>
        <div className="text-sm text-gray-600">{user.email}</div>
      </div>

      {/* Role */}
      <div className="sm:col-span-1">
        <div className="block sm:hidden font-medium text-gray-800">Role:</div>
        <div className="text-sm text-gray-600">{user.role}</div>
      </div>

      {/* Status */}
      <div className="sm:col-span-1">
        <div className="block sm:hidden font-medium text-gray-800">Status:</div>
        <div className="text-sm text-gray-600">{user.status}</div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 justify-start sm:col-span-1">
        <button
          onClick={() => handleEditUser(user)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteUser(user.id)}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>


      {/* Dialog */}
      {openDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingUser ? "Edit User" : "Add User"}
            </h3>
            <UserForm user={editingUser} onSubmit={handleFormSubmit} />
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
