import React, { useState, useEffect } from 'react';
import axios from "axios";
import RoleForm from "../components/RoleForm";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [editingRole, setEditingRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUsing, setSearchUsing] = useState("name"); 

  useEffect(() => {
    // Fetch roles
    axios.get("https://rbac-vrv-security-backend-arfh.onrender.com/roles")
      .then((response) => setRoles(response.data))
      .catch((error) => console.error("Error fetching roles", error));

    // Fetch available permissions
    axios.get("https://rbac-vrv-security-backend-arfh.onrender.com/permissions")
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
        const response = await axios.get(`https://rbac-vrv-security-backend-arfh.onrender.com/users?role=${e.name}`);
        if (response.data.length > 0) {
          alert(`Cannot delete this role as ${response.data.length} user(s) are associated with it.`);
          return;
        }
        await axios.delete(`https://rbac-vrv-security-backend-arfh.onrender.com/roles/${e.id}`);
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
      // Update existing role
      axios
        .put(`https://rbac-vrv-security-backend-arfh.onrender.com/roles/${editingRole.id}`, newRole)
        .then(() => {
          setRoles((prevRoles) =>
            prevRoles.map((role) =>
              role.id === editingRole.id ? { ...role, ...newRole } : role
            )
          );
        })
        .catch((error) => console.error("Error updating role", error));
    } else {
      // Add new role
      axios
        .post("https://rbac-vrv-security-backend-arfh.onrender.com/roles", newRole)
        .then((response) => setRoles([...roles, response.data]))
        .catch((error) => console.error("Error adding role", error));
    }
    setOpenDialog(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Role Management</h2>
      <div className="flex gap-4 content-center py-2 mb-1">
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
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
        <thead>
          <tr className="bg-gray-800 text-white text-left">
            <th className="py-2 px-4">Role Name</th>
            <th className="py-2 px-4">Permissions</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoles.map((role) => (
            <tr key={role.id} className="border-t hover:bg-gray-100">
              <td className="py-2 px-4">{role.name}</td>
              <td className="py-2 px-4">{role.permissions.join(", ")}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => handleEditRole(role)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRole(role)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
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
