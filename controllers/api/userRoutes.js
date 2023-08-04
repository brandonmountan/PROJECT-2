const router = require('express').Router();
const { User } = require('../../models');
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

router.post('/api/users/login', async (req, res) => {
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
      req.session.loggedIn = true;
      req.session.email = req.body.email;

      res.redirect('/');
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.post('/signup', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
      email: req.body.email,
      password: hashedPassword,
    });

    req.session.save(err => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      req.session.loggedIn = true;
      req.session.email = req.body.email;

      res.redirect('/profile');
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
