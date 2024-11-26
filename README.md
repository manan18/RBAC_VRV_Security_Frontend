# Role-Based Access Control (RBAC) UI

This is a Role-Based Access Control (RBAC) UI project, where you can manage users, roles, and permissions. The frontend is built using React, and the backend is a local JSON server to handle role, user, and permission data. The application allows you to perform actions such as:

- Creating and managing permissions, roles and users
- Assigning and modifying permissions to roles
- Assigning roles to users
- Viewing user permissions

## Features
- **User Management**: Add, edit, and delete users, and assign them roles.
- **Role Management**: Create new roles and assign permissions.
- **Permission Management**: Add new permissions, edit existing ones, and prevent deletion if any role is using it.
- **Admin Dashboard**: Admins can view and manage permission requests from users.
- **Dynamic Role and Permission Assignment**: Roles and permissions are dynamically updated and assigned.

# Setup Instructions

## 1. Clone the Repository

Clone the repository to your local machine:
```bash
git clone https://github.com/your-username/rbac-ui.git
cd rbac-ui
```

## 2. Install Dependencies ans Setup Environment Variable

### Frontend Setup:
Install the Required Dependencies: 
```bash
npm install
```

### Backend Setup:
Navigate to the Backend Directory
```bash
cd ../backend
```

Install the required dependencies for the backend:
```bash
npm install
```

### Environment Variable Setup
Create a .env file in the root directory and add the following line to set the API URL:
```bash
REACT_APP_API_URL=http://localhost:3001
```
If you are using a different backend URL, replace http://localhost:3001 with the appropriate URL.

## 3. Start the Backend Server
In the backend directory, run:
```bash
npm start
```
This will start the JSON server on http://localhost:3001

## 4. Start the Frontend server
In a separate terminal, navigate back to the root of the project and run:
```bash
npm start
```
This will start the React development server on http://localhost:3000
