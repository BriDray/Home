const express = require('express');
const session = require('express-session');
const expressHbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
const database = require("./db/db.json");
const { v4: uuidv4 } = require('uuid');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// login session
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// login session middleware
app.use(session(sess));

// Inform Express.js which template engine we're using
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });


// DATABASE
// Get and post
app.route('/api/items')

// Make items list
    .get((req, res) =>
          res.json(database))

// Add new items
    .post((req, res) => {
      let jsonFilePath = path.join(__dirname, './db/db.json');
      let newNotes = ;

      newNotes.id = uuidv4();
      console.log(newNotes);

      database.push(newNotes);
    });