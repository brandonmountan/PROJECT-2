const { User } = require('../models');

const userData = [
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123', 
  },
  {
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'jane.doe@example.com',
    password: 'securepass456', 
  },
  {
    first_name: 'Alice',
    last_name: 'Smith',
    email: 'alice.smith@example.com',
    password: 'mypassword789', 
  },
  {
    first_name: 'Bob',
    last_name: 'Jones',
    email: 'bob.jones@example.com',
    password: 'superpassword01',
  },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
