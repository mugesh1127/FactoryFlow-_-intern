# FactoryFlow-_-intern

# FactoryFlow – Order-to-Workflow Management System

FactoryFlow is a web-based factory management application that helps manage customer orders, production tasks, inventory, employees, and factory operations.

## Technologies Used

### Frontend
- React.js
- Vite
- CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

## Main Features

- Dashboard with factory statistics
- Order management
- Production task management
- Inventory management
- Employee management
- Reports
- Settings

## Project Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the main project folder.

Add your PostgreSQL connection details:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=your_postgresql_connection_string
```

### 3. Create database tables

```bash
node server/init-db.js
```

### 4. Start the application

```bash
npm run dev
```

### 5. Build the frontend

```bash
npm run build
```

## Deployment

The application can be deployed using Render.

- Upload the project to GitHub.
- Connect the GitHub repository to Render.
- Configure the PostgreSQL database.
- Add the required environment variables.
- Deploy the application.

## Project Purpose

FactoryFlow provides a centralized platform to manage factory operations and improve workflow visibility, order tracking, and inventory management.
