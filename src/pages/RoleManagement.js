import React, { useState, useEffect } from 'react';
import axios from "axios";
import RoleForm from "../components/RoleForm";
const baseUrl = process.env.REACT_APP_API_URL;


const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [editingRole, setEditingRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUsing, setSearchUsing] = useState("name"); 
  useEffect(() => {
    axios.get(`${baseUrl}/roles`)
      .then((response) => setRoles(response.data))
      .catch((error) => console.error("Error fetching roles", error));


    axios.get(`${baseUrl}/permissions`)
      .then((response) => setAvailablePermissions(response.data.map((p) => p.name)))
      .catch((error) => console.error("Error fetching permissions", error));
  }, []);

  const handleAddRole = () => {
    setEditingRole(null);
    setOpenDialog(true);
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setOpenDialog(true);
  };

  const handleDeleteRole = async (e) => {
    try {
        const response = await axios.get(`${baseUrl}/users?role=${e.name}`);
        if (response.data.length > 0) {
          alert(`Cannot delete this role as ${response.data.length} user(s) are associated with it.`);
          return;
        }
        await axios.delete(`${baseUrl}/roles/${e.id}`);
        setRoles(roles.filter((role) => role.id !== e.id));
      } catch (error) {
        console.error("Error checking or deleting role", error);
      }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRoles = roles.filter((role) => {
    const field = role[searchUsing];
    if (Array.isArray(field)) {
      return field.some((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return field?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleFormSubmit = (newRole) => {
    if (editingRole) {
      
      axios
        .put(`${baseUrl}/roles/${editingRole.id}`, newRole)
        .then(() => {
          setRoles((prevRoles) =>
            prevRoles.map((role) =>
              role.id === editingRole.id ? { ...role, ...newRole } : role
            )
          );
        })
        .catch((error) => console.error("Error updating role", error));
    } else {
    
      axios
        .post(`${baseUrl}/roles`, newRole)
        .then((response) => setRoles([...roles, response.data]))
        .catch((error) => console.error("Error adding role", error));
    }
    setOpenDialog(false);
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Role Management</h2>
      <div className="md:flex md:gap-4 md:content-center md:py-2 md:mb-1 grid gap-4 grid-cols-3 py-2 mb-4">
        <input
          type="text"
          placeholder="Search Roles by selecting field in the adjacent dropdown..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
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
            <option value="name">Role Name</option>
            <option value="permissions">Permissions</option>
            

            </select>
        <button
          onClick={handleAddRole}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Add Role
        </button>
      </div>
      <div className="grid gap-4">
  {/* Header (Hidden on small screens) */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hidden sm:grid">
    <div>Role Name</div>
    <div>Permissions</div>
    <div>Actions</div>
  </div>

  {/* User Items */}
  {filteredRoles.map((role) => (
    <div
      key={role.id}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white rounded-lg shadow p-4 hover:bg-gray-100"
    >
      {/* Name */}
      <div className="sm:col-span-1">
        <div className="block sm:hidden font-medium text-gray-800">Role Name:</div>
        <div className="text-gray-800">{role.name}</div>
      </div>

      {/* Permission */}
      <div className="sm:col-span-1">
        <div className="block sm:hidden font-medium text-gray-800">Role Permissions:</div>
        <div className="text-sm text-gray-600">{role.permissions.join(", ")}</div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 justify-start sm:col-span-1">
        <button
          onClick={() => handleEditRole(role)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteRole(role)}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

      {openDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingRole ? "Edit Role" : "Add Role"}
            </h3>
            <RoleForm
              role={editingRole}
              availablePermissions={availablePermissions}
              onSubmit={handleFormSubmit}
              onCancel={handleCloseDialog}
            />
          </div>
        </div>
      )}
    </div>
  );
};


export default RoleManagement;
