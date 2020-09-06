var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var { exec } = require("child_process");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/zip", function(req, res, next) {
	if (req.query.filePath) {
		const command = "gzip " + req.query.filePath;
		exec(command, function(err, data) {
			if (err) {
				res.render("zip", {
					title: "Zipping the file failed.",
					message: "Executed the command: " + command,
					error: err.message
				});
			} else {
				res.render("zip", {
					title: "Zipping the file was successful.",
					message: "Executed the command: " + command + "\n",
					result: data
				});
			}
		});
	} else {
		res.render("zip", {
			title: "Zipping the file failed.",
			message: "Please provide a path parameter."
		});
	}
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
