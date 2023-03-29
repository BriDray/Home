const sequelize = require('../config/connections');
const { User, Item } = require('../models');

const userData = require('./userData.json');
const itemData = require('./itemData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

};

seedDatabase();