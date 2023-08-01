const router = require('express').Router();
const { Item } = require('../models');
const withAuth = require('../utils/auth');

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
