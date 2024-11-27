# Role-Based Access Control (RBAC) UI

This is a comprehensive **Role-Based Access Control (RBAC)** UI application that allows for efficient management of users, roles, and permissions in a system. Built with **React** on the frontend and a local **JSON server** as the backend, the application facilitates the creation, assignment, and modification of roles and permissions, making it ideal for organizations that need to manage access control based on user roles.

### Key Features:

#### 1. **User Management**:
- **Add, Edit, and Delete Users**: Administrators can easily add new users, edit existing ones, or delete them from the system.
- **Assign Roles to Users**: Users can be assigned specific roles such as **Admin**, **Editor**, or **Viewer**. A user’s role determines the level of access they have within the application.
- **View User Permissions**: Users can view their permissions based on the roles assigned to them.

#### 2. **Role Management**:
- **Create and Modify Roles**: Admins can create new roles and edit existing roles to reflect changes in organizational needs.
- **Assign Permissions to Roles**: Permissions such as **View**, **Edit**, and **Delete** can be assigned to roles. A role can have multiple permissions based on the level of access required for a user in that role.
- **Role Deletion Restrictions**: Roles can only be deleted if no user is currently assigned to that role. If a role is being used by any user, deletion is prevented, ensuring data integrity.

#### 3. **Permission Management**:
- **Add and Edit Permissions**: Admins can define new permissions (e.g., `View`, `Edit`, `Delete`) and modify existing ones.
- **Prevent Deletion of Permissions in Use**: A permission cannot be deleted if it is currently assigned to any roles. This prevents accidental loss of access rights and ensures that permissions are only removed when they are no longer in use.
- **Permission Assignment**: Permissions can be dynamically assigned to different roles, providing fine-grained control over who can perform certain actions within the application.

#### 4. **Dynamic Role and Permission Assignment**:
- **Real-time Role and Permission Management**: Roles and permissions can be dynamically updated and assigned as per the organization’s changing needs. When a new role is created or an existing role is updated, the changes are reflected immediately for all users assigned that role.
- **Permissions Propagation**: Any changes made to roles or permissions automatically propagate to all users assigned that role, ensuring consistency across the application.

#### 5. **User Interface (UI)**:
- **Interactive Forms**: The application provides user-friendly forms for creating and managing users, roles, and permissions.
- **Search and Filter**: Users, roles, and permissions can be filtered by name, and admins can search for specific entities quickly within the app.
- **Permission-Based UI**: The UI respects the permissions of logged-in users. For example, users with only **view** permissions cannot access pages or functionalities that require **edit** or **delete** rights. This ensures that users can only access the features permitted by their assigned role.

#### 6. **Frontend & Backend**:
- **Frontend**: The user interface is built using **React** and utilizes state management to handle dynamic updates in the UI. It communicates with the backend to fetch, add, edit, and delete data.
- **Backend**: A **JSON server** serves as a mock backend, storing data in `db.json` to handle user, role, and permission management. The backend provides endpoints for managing users, roles, and permissions, and handles requests for data manipulation.

This application is designed to simulate a real-world **RBAC** system and provide administrators with a robust solution to manage user access control in a scalable and secure manner.



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
