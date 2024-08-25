# Bytes & Bites
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).![bytes1](https://github.com/user-attachments/assets/d8a9d430-f125-41d5-b16f-6c0f906ceb8d)

**Bytes & Bites** is a full-stack MERN application that allows users to create, update, and manage their favorite recipes. The app features a user-friendly interface for adding new recipes, editing existing ones, and viewing recipe details, all while ensuring seamless data handling and a smooth user experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- **Recipe Management**: Create, update, and delete recipes.
- **Image Handling**: Attach images to recipes via URL.
- **Dynamic Interface**: Smooth and responsive user interface built with React.
- **Form Validation**: Ensures all necessary fields are filled out.
- **API Integration**: Connects with a backend API for CRUD operations.
- **State Management**: Efficient state handling using React hooks.

## Tech Stack

- **MongoDB**: Database for storing recipe data.
- **Express.js**: Backend framework for building RESTful APIs.
- **React.js**: Frontend library for creating a dynamic user interface.
- **Node.js**: Server-side runtime environment.
- **Mongoose**: ODM for MongoDB.
- **React Router**: For handling client-side routing.
- **CSS**: Styling the frontend.

## Installation

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/bytes-and-bites.git
   cd bytes-and-bites
   ```

2. **Install Dependencies**

   - For the server (backend):

     ```bash
     cd backend
     npm install
     ```

   - For the client (frontend):

     ```bash
     cd ../frontend
     npm install
     ```

3. **Set Up Environment Variables**

   Create a `.env` file in the `backend` directory and add the following:

   ```plaintext
   MONGO_URI=your-mongodb-connection-string
   PORT=5000
   ```

4. **Start the Application**

   - Start the backend server:

     ```bash
     cd backend
     npm start
     ```

   - Start the frontend development server:

     ```bash
     cd ../frontend
     npm start
     ```

5. **Access the Application**

   Visit `http://localhost:3000` in your browser to start using the app.

## Usage

- **Add a Recipe**: Navigate to the "Add Recipe" page, fill out the form with recipe details, and submit.
- **Edit a Recipe**: Click on an existing recipe and select "Edit" to modify its details.
- **Delete a Recipe**: Click on an existing recipe and select "Delete" to remove it from the database.

## API Endpoints

- **GET /api/recipes**: Retrieve all recipes.
- **GET /api/recipes/:id**: Retrieve a specific recipe by ID.
- **POST /api/recipes**: Add a new recipe.
- **PATCH /api/recipes/:id**: Update an existing recipe by ID.
- **DELETE /api/recipes/:id**: Delete a recipe by ID.

