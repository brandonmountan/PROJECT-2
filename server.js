const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const session = require('express-session');
const handlebars = require('handlebars');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge: 3600000, //set to 1 hour
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

app.use(session(sess));

const hbs = exphbs.create({helpers});


app.use(methodOverride('_method'));
// Custom handlebars helpers
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set the views directory to point to the correct location
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static route for serving the public directory
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/homeRoutes.js'));
app.use(require('./controllers/itemRoutes.js'));
app.use(require('./controllers/userRoutes.js'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});