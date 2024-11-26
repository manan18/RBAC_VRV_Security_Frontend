import React, { useState, useEffect } from 'react';
import axios from "axios";
import UserForm from "../components/UserForm";
const baseUrl = process.env.REACT_APP_API_URL;


const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchUsing, setSearchUsing] =useState("name");
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
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="flex gap-4 content-center py-2 mb-1">
        <input
                type="text"
                placeholder="Search Users by selecting field in the adjacent dropdown..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 mr-1"
                onChange={handleSearchChange}
            />

            <select
            id="role"
            value={searchUsing}
            onChange={(e) => setSearchUsing(e.target.value)}
            required
            className=" px-3 py-1 block rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
            <option value="" disabled>
                Search Using
            </option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="role">Role</option>
            <option value="status">Status</option>

            </select>

        <button onClick={handleAddUser} 
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
            Add User
        </button>
      </div>
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow ">
        <thead>
          <tr className="bg-gray-800 text-white text-left">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-100"> 
              <td className="py-2 px-4 ">{user.name}</td>
              <td className="py-2 px-4 ">{user.email}</td>
              <td className="py-2 px-4 ">{user.role}</td>
              <td className="py-2 px-4">{user.status}</td>
              <td className="py-2 px-4 space-x-2">
                <button 
                onClick={() => handleEditUser(user)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                  Edit
                </button>
                <button
                onClick={() => handleDeleteUser(user.id)} 
                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
