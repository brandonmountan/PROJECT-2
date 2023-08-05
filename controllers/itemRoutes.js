const router = require('express').Router();
const { Item } = require('../models');
const withAuth = require('../utils/auth');
const multer = require('multer');

const path = require('path');

router.post('/', withAuth, async (req, res) => {
  try {
    const newItem = await Item.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newItem);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/post-item', withAuth, (req, res) => {
  res.render('post-item');
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create an absolute path to the upload directory
    const uploadPath = path.join(__dirname, '../public/assets/items');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for each uploaded file
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// POST Route to handle form submission
router.post('/upload-item', upload.single('image'), async (req, res) => {
  const { item_name, description, price, start_date, end_date } = req.body; // Include start_date and end_date
  const image_url = '/public/assets/items/' + req.file.filename;

  try {
    await Item.create({ item_name, description, price, start_date, end_date, image_url, user_id: req.session.user_id }); // Include start_date and end_date
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


router.get('/search', async (req, res) => {
  try {
    // Extract the search query from the URL
    const query = req.query.query;

    // Search the items based on the query
    const itemData = await Item.findAll({
      where: {
        item_name: {
          [require('sequelize').Op.like]: `%${query}%`
        }
      }
    });
    const items = itemData.map((item) => item.get({ plain: true }));
    res.render('search-results', { 
      items, 
      // logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const itemData = await Item.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!itemData) {
      res.status(404).json({ message: 'No item found with this id!' });
      return;
    }

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
