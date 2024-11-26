import React, { useState, useEffect } from "react";
import axios from "axios";
import PermissionForm
 from "../components/PermissionForm.js";
const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPermission, setEditingPermission] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUsing, setSearchUsing] =useState("name");

  // Fetch Permissions from Backend
  useEffect(() => {
    axios
      .get("https://rbac-vrv-security-backend-arfh.onrender.com/permissions")
      .then((response) => setPermissions(response.data))
      .catch((error) => console.error("Error fetching permissions:", error));
  }, []);

  // Handle Add Permission
  const handleAddPermission = () => {
    setEditingPermission(null);
    setOpenDialog(true);
  };

  // Handle Edit Permission
  const handleEditPermission = (permission) => {
    setEditingPermission(permission);
    setOpenDialog(true);
  };

  // Handle Delete Permission
  const handleDeletePermission = (e) => {
    // Fetch roles to check if any are using the permission
    axios
      .get(`https://rbac-vrv-security-backend-arfh.onrender.com/roles`)
      .then((response) => {
        const rolesUsingPermission = response.data.filter((role) =>
          role.permissions.includes(e.name)
        );
  
        if (rolesUsingPermission.length > 0) {
          // Alert the user if the permission is in use
          const roleNames = rolesUsingPermission.map((role) => role.name).join(", ");
          alert(
            `Cannot delete this permission. It is being used by the following roles: ${roleNames}.`
          );
        } else {
          // Proceed to delete if no roles are using it
          axios
            .delete(`https://rbac-vrv-security-backend-arfh.onrender.com/permissions/${e.id}`)
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
      // Update permission
      axios
        .put(`https://rbac-vrv-security-backend-arfh.onrender.com/permissions/${editingPermission.id}`, newPermission)
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
      // Add new permission
      axios
        .post("https://rbac-vrv-security-backend-arfh.onrender.com/permissions", newPermission)
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
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Permission Management</h2>

      <div className="flex gap-4 content-center py-2 mb-4">
        <input
          type="text"
          placeholder="Search Permissions by selecting field in the adjacent dropdown..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
          onChange={(e) => setSearchQuery(e.target.value)}
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

      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
        <thead>
          <tr className="bg-gray-800 text-white text-left">
            <th className="py-2 px-4">Permission Name</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPermissions.map((permission) => (
            <tr key={permission.id} className="border-t hover:bg-gray-100">
              <td className="py-2 px-4">{permission.name}</td>
              <td className="py-2 px-4">{permission.description}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => handleEditPermission(permission)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePermission(permission)}
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
