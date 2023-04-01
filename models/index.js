 const User = require('./User');
 const Item = require('./Items')

 User.hasMany(Item, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
 });

 Item.hasOne(User, {
   foreignKey: 'id',
   onDelete: 'SET NULL'
 })

 module.exports = { User, Item };