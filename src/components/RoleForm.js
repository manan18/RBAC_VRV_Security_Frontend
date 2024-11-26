import React, { useState } from "react";

const RoleForm = ({ role, availablePermissions = [], onSubmit, onCancel }) => {
  const [name, setName] = useState(role?.name || "");
  const [permissions, setPermissions] = useState(role?.permissions || []);

  const handlePermissionToggle = (permission) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((perm) => perm !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, permissions });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Role Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Permissions
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {availablePermissions.map((permission) => (
            <label key={permission} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={permissions.includes(permission)}
                onChange={() => handlePermissionToggle(permission)}
              />
              {permission}
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};


export default RoleForm;
