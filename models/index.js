 const User = require('./User');
 const Item = require('./Items')

 User.hasMany(Item, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
 });

 module.exports = { User, Item };