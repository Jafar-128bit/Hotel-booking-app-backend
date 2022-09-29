require('dotenv').config({ path: "./bin/.env" });
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDatabase = require('./database/dbConnect');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const hotelsRouter = require('./routes/hotels');
const roomsRouter = require('./routes/rooms');
const authRouter = require('./routes/auth');

const app = express();

connectDatabase();
//middleware
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Custom middleware
app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/hotels', hotelsRouter);
app.use('/api/v1/rooms', roomsRouter);
app.use('/api/v1/auth', authRouter);

app.use((
    err,
    req,
    res,
    next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    res.status(errorStatus).jsonp({
        success:false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
    next();
});

module.exports = app;
