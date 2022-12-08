const db = require("./connector");

exports.getAll = (req, res) => {
	db.query(
		"SELECT * FROM tasks t inner join categories c on t.catId=c.catId",
		(err, results) => {
			if (err) throw err;
			res.send(apiResponse(results));
		}
	);
};

exports.getAllCategories = (req, res) => {
	db.query(
		req.params.c
			? "select * from categories where catID not in (select CatID from tasks)"
			: "SELECT * from categories",
		(err, results) => {
			if (err) throw err;
			res.send(apiResponse(results));
		}
	);
};

exports.displayByID = (req, res) => {
	db.query(
		"SELECT * FROM tasks t inner join categories c on t.catId=c.catId where t.id=?",
		req.params.id,
		(err, results) => {
			if (err) throw err;
			res.send(apiResponse(results));
		}
	);
};

exports.displayByCategory = (req, res) => {
	db.query(
		"SELECT * FROM tasks where catID=?",
		req.params.id,
		(err, results) => {
			if (err) throw err;
			res.send(apiResponse(results));
		}
	);
};

exports.saveTask = (req, res) => {
	db.query(
		"INSERT INTO tasks SET ?",
		{
			title: req.body.title,
			body: req.body.body == undefined ? "" : req.body.body,
			catID: req.body.catID,
		},
		(err, results) => {
			if (err) throw err;
			res.send(apiResponse("Data Inserted Successfully"));
		}
	);
};

exports.saveCategory = (req, res) => {
	db.query(
		"INSERT INTO categories SET ?",
		{ categoryName: req.body.categoryName },
		(err, results) => {
			if (err) throw err;
			res.send(apiResponse(results));
		}
	);
};

exports.updateTask = (req, res) => {
	db.query(
		"UPDATE `tasks` SET `Title`=?,`Body`=?,`Status`=? WHERE ID=?",
		[req.body.title, req.body.body, req.body.status, req.params.id],
		(err, results) => {
			if (err) throw err;
			res.send(apiResponse(results));
		}
	);
};

exports.updateCategory = (req, res) => {
	db.query(
		"update categories set categoryName=? where catId=?",
		[req.body.categoryName, req.params.id],
		(err, results) => {
			if (err) throw err;
			res.send(apiResponse(results));
		}
	);
};

exports.deleteTask = (req, res) => {
	const query = `delete from tasks where ${
		req.params.catID ? "catID" : "id"
	}=?`;
	const params = [req.params.catID ? req.params.catID : req.params.id];

	db.query(query, params, (err, results) => {
		if (err) throw err;
		res.send(apiResponse(results));
	});
};

exports.deleteCategory = (req, res) => {
	if (req.params.status) {
		db.query(
			"delete from tasks where status=1 and catID=?",
			[req.params.id],
			(err, results) => {
				if (err) throw err;
				res.send(apiResponse(results));
			}
		);
	} else {
		db.query(
			"delete from categories where catId=?",
			[req.params.id],
			(err, results) => {
				if (err) throw err;
				res.send(apiResponse(results));
			}
		);
	}
};

exports.default = (req, res) =>
	res.send(
		"<center><h1 style='font-family:sans-serif'><br><br>WOT?? Why are you here?? <br>For whom have I made such a nice frontend, go there</h1>_____⚠️⚠️⚠️_____</center>"
	);

function apiResponse(results) {
	return JSON.stringify({ status: 200, error: null, response: results });
}
