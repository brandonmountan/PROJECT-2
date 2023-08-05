const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.render('profile');
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      return res.status(400).json({ message: 'Incorrect email or password, please try again' });
    }

    const validPassword = await bcrypt.compare(req.body.password, userData.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect email or password, please try again' });
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.post('/signup', async (req, res) => {
  try {
     await User.create({  
      username: req.body.username, 
      email: req.body.email,
      password: req.body.password,
    });
    
    req.session.save(() => { 
      req.session.loggedIn = true;
      req.session.username = req.body.username;

      res.redirect('/'); 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/'); // Redirect to homepage after logout
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
