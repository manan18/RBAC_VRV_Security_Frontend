import React, { useState, useEffect } from "react";
import axios from "axios";
import PermissionForm
 from "../components/PermissionForm.js";
 const baseUrl = process.env.REACT_APP_API_URL;
 
const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPermission, setEditingPermission] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUsing, setSearchUsing] =useState("name");

  useEffect(() => {
    axios
      .get(`${baseUrl}/permissions`)
      .then((response) => setPermissions(response.data))
      .catch((error) => console.error("Error fetching permissions:", error));
  }, []);

  const handleAddPermission = () => {
    setEditingPermission(null);
    setOpenDialog(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEditPermission = (permission) => {
    setEditingPermission(permission);
    setOpenDialog(true);
  };

  const handleDeletePermission = (e) => {
    axios
      .get(`${baseUrl}/roles`)
      .then((response) => {
        const rolesUsingPermission = response.data.filter((role) =>
          role.permissions.includes(e.name)
        );
  
        if (rolesUsingPermission.length > 0) {
          const roleNames = rolesUsingPermission.map((role) => role.name).join(", ");
          alert(
            `Cannot delete this permission. It is being used by the following roles: ${roleNames}.`
          );
        } else {
          axios
            .delete(`${baseUrl}/permissions/${e.id}`)
            .then(() => {
              setPermissions((prevPermissions) =>
                prevPermissions.filter((perm) => perm.id !== e.id)
              );
            })
            .catch((error) => console.error("Error deleting permission", error));
        }
      })
      .catch((error) => console.error("Error fetching roles", error));
  };

  const handleFormSubmit = (newPermission) => {
    if (editingPermission) {
      axios
        .put(`${baseUrl}/permissions/${editingPermission.id}`, newPermission)
        .then(() => {
          setPermissions((prevPermissions) =>
            prevPermissions.map((perm) =>
              perm.id === editingPermission.id ? { ...perm, ...newPermission } : perm
            )
          );
          setOpenDialog(false);
        })
        .catch((error) => console.error("Error updating permission", error));
    } else {
      axios
        .post(`${baseUrl}/permissions`, newPermission)
        .then((response) => {
          setPermissions([...permissions, response.data]);
          setOpenDialog(false);
        })
        .catch((error) => console.error("Error adding permission", error));
    }
  };

  const filteredPermissions = permissions.filter((permission) =>
    permission[searchUsing]?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Permission Management</h2>

      <div className="md:flex md:gap-4 md:content-center md:py-2 md:mb-1 grid gap-4 grid-cols-3 py-2 mb-4">
        <input
          type="text"
          placeholder="Search Permissions by selecting field in the adjacent dropdown..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
          onChange={handleSearchChange}
        />
        <select
            id="permissions"
            value={searchUsing}
            onChange={(e) => setSearchUsing(e.target.value)}
            required
            className=" px-3 py-1 block rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
            <option value="" disabled>
                Search Using
            </option>
            <option value="name">Permission Name</option>
            <option value="description">Description</option>
            

            </select>
        <button
          onClick={handleAddPermission}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Add Permission
        </button>
      </div>

      <div className="grid gap-4">
  {/* Header (Hidden on small screens) */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hidden sm:grid">
    <div>Permission Name</div>
    <div>Description</div>
    <div>Actions</div>
  </div>

  {/* User Items */}
  {filteredPermissions.map((permission) => (
    <div
      key={permission.id}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white rounded-lg shadow p-4 hover:bg-gray-100"
    >
      {/* Name */}
      <div className="sm:col-span-1">
        <div className="block sm:hidden font-medium text-gray-800">Role Name:</div>
        <div className="text-gray-800">{permission.name}</div>
      </div>

      {/* Permission */}
      <div className="sm:col-span-1">
        <div className="block sm:hidden font-medium text-gray-800">Role Permissions:</div>
        <div className="text-sm text-gray-600">{permission.description}</div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 justify-start sm:col-span-1">
        <button
          onClick={() => handleEditPermission(permission)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeletePermission(permission)}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

      {openDialog && (
        <PermissionForm
          permission={editingPermission}
          onSubmit={handleFormSubmit}
          onCancel={() => setOpenDialog(false)}
        />
      )}
    </div>
  );
};



export default PermissionManagement;
