const router = require('express').Router();
const { Item, Cart, User } = require('../models');
const withAuth = require('../utils/auth');
const multer = require('multer');

const path = require('path');

// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newItem = await Item.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newItem);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

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

router.get('/cart', withAuth, async (req, res) => {
  try {
    const { user_id } = req.session;

    // Find all cart items associated with the current user
    const cartItems = await Cart.findAll({
      where: {
        user_id,
      },
      include: [
        {
          model: Item,
          attributes: ['id', 'item_name', 'description', 'price', 'image_url'],
        },
      ],
    });

    // Pass the cart items to the view for rendering
    res.render('cart', { cartItems });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.post('/add-to-cart/:item_id', withAuth, async (req, res) => {
  try {
    const { item_id } = req.params;
    const { user_id } = req.session;

    // Check if the item is already in the cart
    const existingCartItem = await Cart.findOne({
      where: {
        item_id,
        user_id,
      },
    });

    if (existingCartItem) {
      // If the item is already in the cart, update its quantity
      existingCartItem.quantity += 1;
      await existingCartItem.save();
    } else {
      
      // If the item is not in the cart, create a new cart item
      await Cart.create({
        item_id,
        user_id,
      });
    }

    res.redirect('/cart');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/remove-from-cart/:id', withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if the cart item exists for the current user
    const cartItem = await Cart.findOne({
      where: {
       id,
        user_id: req.session.user_id,
      },
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in the cart' });
    }

    // Remove the item from the cart
    await cartItem.destroy();

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.post('/edit-item/:id', withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { item_name, description, price } = req.body;

    const itemData = await Item.findByPk(id);

    if (!itemData) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    // Ensure that only the owner can edit the item
    if (itemData.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'You are not authorized to edit this item' });
      return;
    }

    // Update the item
    await itemData.update({ item_name, description, price });

    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/delete-item/:id', withAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const itemData = await Item.findByPk(id);

    if (!itemData) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    // Ensure that only the owner can delete the item
    if (itemData.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'You are not authorized to delete this item' });
      return;
    }

    // Delete the item
    await itemData.destroy();

    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
