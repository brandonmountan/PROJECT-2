const sequelize = require('../config/connection');
const seedUsers = require('./user-seeds');
const seedItems = require('./item-seeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('Database synced');

  await seedUsers();
  console.log('Users seeded');

  await seedItems();
  console.log('Items seeded');

  process.exit(0);
};

seedAll();
