const express = require("express");
const app = express();
const controller = require("./util/controller");
const cors = require("cors");
const port = 3177;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// ---------------- Api Routes ----------------

app.get("/api/tasks", controller.getAll);
app.get("/api/tasks/:id", controller.displayByID);
app.get("/api/tasks/c/all/:c?", controller.getAllCategories);
app.get("/api/tasks/c/:id", controller.displayByCategory);
app.post("/api/tasks/c", controller.saveCategory);
app.post("/api/tasks", controller.saveTask);
app.put("/api/tasks/:id", controller.updateTask);
app.put("/api/tasks/c/:id", controller.updateCategory);
app.delete("/api/tasks/:id([0-9]+)/:catID?", controller.deleteTask);
app.delete("/api/tasks/c/:id/:status?", controller.deleteCategory);

//

app.get("*", controller.default);

app.listen(port, () =>
	console.log(`Server running at http://localhost:${port}`)
);

// /**
//  *
//  *  get    | /api/tasks = getAll tasks
//  *  get    | /api/tasks/c/all/:c? = get All Categories
//  *  get    | /api/tasks/:id = get task by taskId
//  *  get    | /api/tasks/c/:id = get tasks by category
//  *  post   | /api/tasks = add task
//  *  post   | /api/tasks/c = add category
//  *  put	  | /api/tasks/:id = update task by taskId
//  *  put	  | /api/tasks/c/:id = update category by categoryId
//  *  delete | /api/tasks/:id([0-9]+)/:catID? = delete task by taskId
//  *  delete | /api/tasks/c/:id/:status? = delete category by categoryId
//  *
//  */
