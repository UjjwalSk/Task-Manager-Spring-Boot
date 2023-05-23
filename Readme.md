# Task Manager API

The Task Manager API is a RESTful web service built with Spring Boot. It provides endpoints to manage tasks and categories in a task management system.

## API Endpoints

### Tasks

- **GET /todo**: Get all tasks
- **GET /todo/c/{catId}**: Get tasks by category ID
- **POST /todo**: Create a new task
- **PUT /todo/{id}**: Update a task by ID
- **PUT /todo/{id}/{status}**: Update the status of a task by ID
- **DELETE /todo/{id}**: Delete a task by ID
- **DELETE /todo/{id}/{catId}**: Delete a task by ID and category ID
- **DELETE /todo/{id}/{catId}/{status}**: Delete a task by ID, category ID, and status

### Categories

- **GET /categories**: Get all categories
- **POST /categories**: Create a new category
- **DELETE /categories/{id}**: Delete a category by ID
- **DELETE /categories/deleteUnused**: Delete all unused categories

### Random Quote

- **GET /random**: Get a random quote

## Database Tables

The Task Manager API uses a PostgreSQL database to store tasks and categories. The following tables are used:

- **todos**: Stores task information
  - Columns: id (primary key), title, description, time, status, catId (foreign key to categories table)
- **categories**: Stores category information
  - Columns: id (primary key), name

## Running the Application

To run the Task Manager API locally, follow these steps:

1. Make sure you have Docker installed on your machine.
2. Clone the project repository.
3. Build the Docker image for the backend application using the provided Dockerfile.
   ```shell
   docker build -t backend .
