const express = require('express');
require('dotenv').config();
const port = process.env.PORT | "8000";
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const userRoute = require('./routes/route');

const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017';
module.exports.connection = mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));

const MongoStore = require('connect-mongo');
const session = require('express-session');

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: dbURI })
}))

var passport = require('passport');
require('./config/passport-config');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', userRoute);

app.listen(port, () => {
    console.log(`Listening on ${port}`);
})
module.exports = app;
