const router = require('express').Router();
const { Item } = require('../../models');
const withAuth = require('../../utils/auth');
const upload = require('../../fileUpload');
const multer = require('multer');


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
router.post('/upload-item', upload.single('image'), (req, res) => {
  // Access form data using req.body
  const item_name = req.body.item_name;
  const description = req.body.description;
  const price = req.body.price;
  const posting_title = req.body.posting_title;
  const title_max_length = req.body.title_max_length;
  const category = req.body.category;
  const zipcode = req.body.zipcode;
  const current_location = req.body.current_location;
  const rental_price_period = req.body.rental_price_period;
  const item_value = req.body.item_value;
  const quantity_lightbulb = req.body.quantity_lightbulb;
  const minimum_rental_days = req.body.minimum_rental_days;

  // Access the uploaded file using req.file
  const image = req.file;

  items.push({
    item_name,
    description,
    price,
    posting_title,
    image,
  });

  res.redirect('/');
  res.send('Form submitted and file uploaded successfully!');

});

router.get('/search', async (req, res) => {
  try {
    // Extract the search query from the URL
    const query = req.query.query;

    // Search the items based on the query
    const itemData = await Item.findAll({
      where: {
        name: {
          [require('sequelize').Op.like]: `%${query}%`
        }
      }
    });

    const items = itemData.map((item) => item.get({ plain: true }));
    res.render('search-results', { 
      items, 
      logged_in: req.session.logged_in 
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
