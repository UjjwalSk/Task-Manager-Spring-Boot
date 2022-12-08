const mysql = require("mysql");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "project",
});

db.connect((err) =>
	console.log(err ? err : "Database Connected Successfully !!")
);

module.exports = db;


