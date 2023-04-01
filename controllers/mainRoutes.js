const router = require('express').Router();
const { Item, User } = require('../models');
const withAuth = require('../utils/auth');

// get all items
router.get('/', async (req, res) => {
    try {
      const allItemsData = await Item.findAll({
        include: [
          {
            model: Item,
            attributes: ['name'],
          },
        ],
      });
  
      const allItems = allItemsData.map((item) => item.get({ plain: true }));
  
      res.render('mainPage', { 
        allItems, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // get one item
router.get('/item/:id', async (req, res) => {
    try {
      const itemData = await Item.findByPk(req.params.id, {
        include: [
          {
            model: Item,
            attributes: ['name'],
          },
        ],
      });
  
      const item = itemData.get({ plain: true });
  
      res.render('item', {
        ...item,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Project }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/mainPage');
      return;
    }
  
    res.render('SignInPage');
  });
  
  module.exports = router;