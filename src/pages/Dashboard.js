import React, { useState, useEffect } from 'react';
import axios from 'axios';




const Dashboard = () => {

  const [userCount, setUserCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);
  const [usersByRole, setUsersByRole] = useState({});
  const [error, setError] = useState(null);
  const rolesCount = Object.keys(usersByRole).length;


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch users data from /users endpoint
        const response = await axios.get('https://rbac-vrv-security-backend-arfh.onrender.com/users');
        const users = response.data;

        // Get user count
        const totalUsers = users.length;

        // Get active and inactive users count
        const activeUsersCount = users.filter(user => user.status === 'Active').length;
        const inactiveUsersCount = users.filter(user => user.status === 'Inactive').length;

        // Get users by role
        const usersByRole = users.reduce((acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {});

        
        setUserCount(totalUsers);
        setActiveUsers(activeUsersCount);
        setInactiveUsers(inactiveUsersCount);
        setUsersByRole(usersByRole);
      } catch (error) {
        setError('Failed to fetch data');
        console.error('Error fetching users data', error);
      }
    };


    fetchDashboardData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Users</h3>
          <p className="text-3xl font-bold">{userCount}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Roles</h3>
          <p className="text-3xl font-bold">{rolesCount}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Active Users</h3>
          <p className="text-3xl font-bold">{activeUsers}</p>
        </div>

      </div>
      <div className="space-y-3">
        <h2 className="mt-2 text-2xl font-semibold text-gray-700">Users by Role</h2>
        <div className="bg-gray-50 p-3 rounded-lg shadow-md">
          {Object.entries(usersByRole).map(([role, count]) => (
            <div key={role} className="flex justify-between">
              <span className="text-lg font-medium text-gray-700">{role}</span>
              <span className="text-lg font-semibold text-gray-800">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

