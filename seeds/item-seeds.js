const {
  Item
} = require('../models');

const itemData = [{
    item_name: 'Mountain Bike',
    description: 'A sturdy mountain bike suitable for all terrains',
    price: 199.99,
    start_date: '2023-08-01',
    end_date: '2023-08-31',
    image_url: '/public/assets/items/pngwing.com (10).png',
    user_id: 1
  },
  {
    item_name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 999.99,
    start_date: '2023-09-01',
    end_date: '2023-09-30',
    image_url: '/public/assets/items/pngwing.com (19).png',
    user_id: 2
  },
  {
    item_name: 'RV',
    description: 'a 30-foot RV with a full kitchen and bathroom',
    price: 699.99,
    start_date: '2023-10-01',
    end_date: '2023-10-31',
    image_url: '/public/assets/items/pngwing.com (17).png',
    user_id: 3
  },
  {
    item_name: 'Coffee Maker',
    description: 'Programmable coffee maker with 12-cup capacity',
    price: 49.99,
    start_date: '2023-11-01',
    end_date: '2023-11-30',
    image_url: '/public/assets/items/pngwing.com (18).png',
    user_id: 4
  },
];

const seedItems = () => Item.bulkCreate(itemData);

module.exports = seedItems;