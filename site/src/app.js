const dotenv = require("dotenv").config();
console.log(`Environment: ${process.env.NODE_ENV}`);
//console.log(dotenv.parsed);
if (dotenv.error) {
    throw dotenv.error;
}

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
const session = require('express-session')

const db = require('./database/models/index');
const localsCheck = require('./middlewares/localsCheak')


const usersRouter = require("./routes/usersRouter");
const indexRouter = require("./routes/indexRouter");
const cartRouter = require("./routes/cartRouter");
const moviesRouter = require("./routes/moviesRouter");
const adminRouter = require("./routes/adminRouter");
const genresRouter = require("./routes/genresRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const salesRouter = require("./routes/salesRouter");
const coockieCheak = require("./middlewares/coockieCheak");

const app = express();
// view engine setup
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(methodOverride("_method"));
app.use(session({ secret: 'kairak' }))

app.use(coockieCheak)
app.use(localsCheck)

app.use("/", indexRouter);
app.use("/cart", cartRouter);
app.use("/users", usersRouter);
app.use("/movies", moviesRouter);
app.use("/admin", adminRouter);
app.use("/categories", categoriesRouter);
app.use("/genres", genresRouter);
app.use("/sales", salesRouter);

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