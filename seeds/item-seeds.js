const {
  Item
} = require('../models');

const itemData = [{
    item_name: 'Mountain Bike',
    description: 'A sturdy mountain bike suitable for all terrains',
    price: 19.99,
    start_date: '2023-08-01',
    end_date: '2023-08-31',
    image_url: '/public/assets/items/pngwing.com (10).png',
    user_id: 1
  },
  {
    item_name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 9.99,
    start_date: '2023-09-01',
    end_date: '2023-09-30',
    image_url: '/public/assets/items/pngwing.com (19).png',
    user_id: 2
  },
  {
    item_name: 'RV',
    description: 'a 30-foot RV with a full kitchen and bathroom',
    price: 299.99,
    start_date: '2023-10-01',
    end_date: '2023-10-31',
    image_url: '/public/assets/items/pngwing.com (17).png',
    user_id: 3
  },
  {
    item_name: 'Coffee Maker',
    description: 'Programmable coffee maker with 12-cup capacity',
    price: 4.99,
    start_date: '2023-11-01',
    end_date: '2023-11-30',
    image_url: '/public/assets/items/pngwing.com (18).png',
    user_id: 4
  },
{
    item_name: 'playstation 5',
    description: 'Latest gaming console with multiple games included',
    price: 7.99,
    start_date: '2023-12-01',
    end_date: '2023-12-31',
    image_url: '/public/assets/items/pngwing.com (29).png',
    user_id: 3
  },
  {
    item_name: 'motor bike',
    description: 'A sturdy motor bike suitable for all terrains',
    price: 49.99,
    start_date: '2024-01-01',
    end_date: '2024-01-31',
    image_url: '/public/assets/items/pngwing.com (28).png',
    user_id: 3
  },
  {
    item_name: 'Portable Bluetooth Speaker',
    description: 'Waterproof speaker with excellent sound quality',
    price: 0.99,
    start_date: '2024-02-01',
    end_date: '2024-02-28',
    image_url: '/public/assets/items/pngwing.com (27).png',
    user_id: 2
  },
  {
    item_name: 'Digital Camera',
    description: 'Mirrorless camera with 4K video recording',
    price: 8.99,
    start_date: '2024-03-01',
    end_date: '2024-03-31',
    image_url: '/public/assets/items/pngwing.com (26).png',
    user_id: 1
  },
  {
    item_name: 'Fitness Tracker',
    description: 'Smart fitness tracker with heart rate monitoring',
    price: 1.99,
    start_date: '2024-04-01',
    end_date: '2024-04-30',
    image_url: '/public/assets/items/pngwing.com (25).png',
    user_id: 2
  },
  {
    item_name: 'Electric Scooter',
    description: 'Foldable electric scooter for convenient commuting',
    price: 2.99,
    start_date: '2024-05-01',
    end_date: '2024-05-31',
    image_url: '/public/assets/items/pngwing.com (24).png',
    user_id: 1
  },
  {
    item_name: 'Air Fryer',
    description: 'Oil-less air fryer for healthier cooking',
    price: 8.99,
    start_date: '2024-06-01',
    end_date: '2024-06-30',
    image_url: '/public/assets/items/pngwing.com (23).png',
    user_id: 2
  },
  {
    item_name: 'Virtual Reality Headset',
    description: 'Immersive VR headset for gaming and experiences',
    price: 3.99,
    start_date: '2024-07-01',
    end_date: '2024-07-31',
    image_url: '/public/assets/items/pngwing.com (22).png',
    user_id: 1
  },
  {
    item_name: 'Electric Guitar',
    description: 'Professional electric guitar for musicians',
    price: 6.99,
    start_date: '2024-08-01',
    end_date: '2024-08-31',
    image_url: '/public/assets/items/pngwing.com (21).png',
    user_id: 3
  },
  {
    item_name: 'Robotic Vacuum Cleaner',
    description: 'Smart vacuum cleaner that cleans autonomously',
    price: 2.99,
    start_date: '2024-09-01',
    end_date: '2024-09-30',
    image_url: '/public/assets/items/pngwing.com (20).png',
    user_id: 4
  },
];

const seedItems = () => Item.bulkCreate(itemData);

module.exports = seedItems;