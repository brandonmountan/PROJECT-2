const router = require('express').Router();
const { Item, User } = require('../models');
const withAuth = require('../utils/auth');
const imagesData = require('../models/imagesData');
// const profileData = require('../models/profileData');

router.get('/', async (req, res) => {
  try {
    res.render('homepage', { 
      imagesData,
      // profileData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/item', async (req, res) => {
  res.render('item');
});

router.get('/item/:id', async (req, res) => {
  try {
    const itemData = await Item.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });

    const item = itemData.get({ plain: true });

    res.render('item', {
      ...item,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
// NEED PROFILE HANDLEBARS
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Item }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  
  res.render('login');

});

router.get('/sign-up', async (req, res) => {
  console.log("Rendering signup view");
  res.render('sign-up');
});

module.exports = router;
