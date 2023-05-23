# Task Manager

|  |  |
| --- | --- |
| [![Image 1](https://github.com/UjjwalSk/Task-Manager-Spring-Boot/blob/main/ss/1.png)](https://github.com/UjjwalSk/Task-Manager-Spring-Boot/blob/main/ss/1.png) | [![Image 2](https://github.com/UjjwalSk/Task-Manager-Spring-Boot/blob/main/ss/2.png)](https://github.com/UjjwalSk/Task-Manager-Spring-Boot/blob/main/ss/2.png) |
| [![Image 3](https://github.com/UjjwalSk/Task-Manager-Spring-Boot/blob/main/ss/3.png)](https://github.com/UjjwalSk/Task-Manager-Spring-Boot/blob/main/ss/3.png) | [![Image 4](https://github.com/UjjwalSk/Task-Manager-Spring-Boot/blob/main/ss/4.png)](https://github.com/UjjwalSk/Task-Manager-Spring-Boot/blob/main/ss/4.png) |
| [![Image 5](https://github.com/UjjwalSk/Task-Manager-Spring-Boot/blob/main/ss/5.png)](https://github.com/UjjwalSk/Task-Manager-Spring-Boot/blob/main/ss/5.png) | [![Image 6](https://github.com/UjjwalSk/Task-Manager-Spring-Boot/blob/main/ss/6.png)](https://github.com/UjjwalSk/Task-Manager-Spring-Boot/blob/main/ss/6.png) |


## Tech Stack

The Task Manager API is built using the following technologies:

- **Backend:**
  - Java: Programming language for the backend logic
  - Spring Boot: Framework for creating Java applications
  - Spring Data JPA: Simplifies database access and provides JPA support
  - PostgreSQL: Relational database management system
  - RestTemplate: HTTP client for making API requests

- **Frontend:**
  - React: JavaScript library for building user interfaces
  - Vite: Build tooling for modern web applications

- **Containerization:**
  - Docker: Containerization platform for running applications in isolated environments
  - Docker Compose: Tool for defining and running multi-container Docker applications


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
3. Build the spring-boot app to generate the .jar 

   ```shell
   mvn install
   ```
4. Run the docker-compose.yaml which will directly build & start the containers

   ```shell
   docker-compose -f ./docker-compose.yaml up
   ```
5. Go to ```http://localhost:5173/``` to view !
