 const User = require('./User');
 const Item = require('./Items')

 User.hasMany(Item, {
    foreignKey: 'user_id',
    // onDelete: 'CASCADE'
 });

 Item.belongsTo(User, {
   foreignKey: 'user_id',
  //  onDelete: 'SET NULL'
 })

 module.exports = { User, Item };