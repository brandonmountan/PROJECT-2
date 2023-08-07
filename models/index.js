// Import models
const Cart = require('./Cart');
const User = require('./User');
const Item = require('./Item');

User.hasMany(Item, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Items belongs to User
Item.belongsTo(User, {
  foreignKey: 'user_id',
});

// User has many Cart items
User.hasMany(Cart, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Cart items belong to User
Cart.belongsTo(User, {
  foreignKey: 'user_id',
});

// Items can have many Cart items (through Cart)
Item.belongsToMany(Cart, {
  through: 'cart',
  foreignKey: 'item_id',
});

// Cart items belong to Item (through Cart)
Cart.belongsToMany(Item, {
  through: 'cart',
  foreignKey: 'cart_id',
});

module.exports = { User, Item, Cart };