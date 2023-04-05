const router = require('express').Router();
const { Item, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/signInPage', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/mainPage');
    return;
  }

  res.render('signInPage');
});

module.exports = router;

// Use withAuth middleware to prevent access to route
router.get('/mainPage', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('mainPage', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all items
router.get('/', async (req, res) => {
    try {
      const allItemsData = await Item.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
      console.log(req.session.logged_in);
      const allItems = allItemsData.map((item) => item.get({ plain: true }));
      if (req.session.logged_in){
      res.render('mainPage', { 
        allItems, 
        logged_in: req.session.logged_in 
      });
    }else{
      res.render('signInPage');
    }
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
            model: User,
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

  router.get('/SignUpPage', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('SignUpPage');
  });


 
