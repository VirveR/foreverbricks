const express = require('express');
const app = express();

// Session
const cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(cookieParser());
app.use(session({secret: 'noyhtelisnoy'}));

// Routing
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use('', require(__dirname + '/routes/routes'));
app.use('', require(__dirname + '/routes/partRoutes'));
app.use('', require(__dirname + '/routes/setRoutes'));

// Rendering
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'handlebars');

// Listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running, port ${PORT}`));