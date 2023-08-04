// Import models
const User = require('./User');
const Item = require('./Item');

// User has many Items
User.hasMany(Item, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Items belongs to User
Item.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Item };