const dotenv = require("dotenv").config();
console.log(`Environment: ${process.env.NODE_ENV}`);
if (dotenv.error) {
	throw dotenv.error;
}
console.log(dotenv.parsed);

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
const db = require('./database/models/index');

const usersRouter = require("./routes/usersRouter");
const indexRouter = require("./routes/indexRouter");
const carritoRouter = require("./routes/carritoRouter");
const moviesRouter = require("./routes/moviesRouter");
const adminRouter = require("./routes/adminRouter");

const app = express();
// view engine setup
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(methodOverride("_method"));

app.use("/", indexRouter);
app.use("/carrito", carritoRouter);
app.use("/users", usersRouter);
app.use("/movies", moviesRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

//Testing DB connection
async function testConnectionDB(sequelize) {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}
testConnectionDB(db.sequelize);

module.exports = app;
