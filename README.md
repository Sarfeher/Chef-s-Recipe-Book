# Bytes & Bites

![bytes1](https://github.com/user-attachments/assets/d8a9d430-f125-41d5-b16f-6c0f906ceb8d)

**Bytes & Bites** is a full-stack MERN application that allows users to create, update, and manage their favorite recipes. The app features a user-friendly interface for adding new recipes, editing existing ones, and viewing recipe details, all while ensuring seamless data handling and a smooth user experience. Now with Docker support for streamlined development and deployment.
<img width="1678" alt="Képernyőfotó 2024-08-29 - 8 54 33" src="https://github.com/user-attachments/assets/2320f47c-a10a-4f1e-9aef-1f2e852472e7">

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Docker Setup](#docker-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- **Recipe Management**: Create, update, and delete recipes.
- **Image Handling**: Attach images to recipes via URL.
- **Dynamic Interface**: Smooth and responsive user interface built with React.
- **Form Validation**: Ensures all necessary fields are filled out.
- **API Integration**: Connects with a backend API for CRUD operations.
- **State Management**: Efficient state handling using React hooks.
- **Dockerized Deployment**: Easily run the application in isolated containers using Docker.



## Tech Stack

- ![Static Badge](https://img.shields.io/badge/MongoDB-%2347A248?style=for-the-badge&logo=mongodb&logoColor=white)
 Database for storing recipe data.
- ![Static Badge](https://img.shields.io/badge/Express-%23000000?style=for-the-badge&logo=express&logoColor=white)
 Backend framework for building RESTful APIs.
- ![Static Badge](https://img.shields.io/badge/React-blue?style=for-the-badge&logo=react&logoColor=white)
 Frontend library for creating a dynamic user interface.
- ![Static Badge](https://img.shields.io/badge/Node.js-%235FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white)
 Server-side runtime environment.
- ![Static Badge](https://img.shields.io/badge/Mongoose-%23880000?style=for-the-badge&logo=mongoose&logoColor=white)
 ODM for MongoDB.
- ![Static Badge](https://img.shields.io/badge/React_router-%23CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
 For handling client-side routing.
- ![Static Badge](https://img.shields.io/badge/CSS-%231572B6?style=for-the-badge&logo=css3&logoColor=white)
 Styling the frontend.
- ![Static Badge](https://img.shields.io/badge/Docker-%232496ED?style=for-the-badge&logo=docker&logoColor=white)
 Containerization platform for consistent development and deployment environments.

## Installation

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Docker](https://www.docker.com/get-started) (if using Docker)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Sarfeher/Chef-s-Recipe-Book
   cd Chef-s-Recipe-Book
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

## Docker Setup

### Prerequisites

Ensure you have Docker installed on your system.

### Steps

1. **Start Containers**
   
   Run the containers:

   ```bash
   cd Chef-s-Recipe-Book
   docker-compose up
   ```

3. **Access the Application**

   Visit `http://localhost:3000` in your browser to use the app.

4. **Stop Containers**

   To stop the containers, run:

   ```bash
   docker-compose down
   ```

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
[Create React App](https://github.com/facebook/create-react-app)

