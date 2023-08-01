const { User } = require('../models');

const userData = [
  {
    email: 'john.doe@example.com',
    password: 'password123', 
  },
  {
    email: 'jane.doe@example.com',
    password: 'securepass456', 
  },
  {
    email: 'alice.smith@example.com',
    password: 'mypassword789', 
  },
  {
    email: 'bob.jones@example.com',
    password: 'superpassword01',
  },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
