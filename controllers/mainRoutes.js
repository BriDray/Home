const router = require('express').Router();
const { Item, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/signInPage', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/mainPage');
    return;
  }

  res.render('SignInPage');
});

module.exports = router;

// Use withAuth middleware to prevent access to route
router.get('/mainPage', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Item }],
    });

    const user = userData.get({ plain: true });

    res.render('mainpage', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all items
router.get('/', withAuth, async (req, res) => {
  // issue with findbypk
  console.log(req.session.user_id);
  try {
    const userItemsData = await User.findOne(
     { where: {id: req.session.user_id},
      attributes: { exclude: ['password'] },
      include: [{model: Item,
        attributes: {exclude: ['id']},
      }],
    
    });

    // Serialize data so the template can read it
    const user = userItemsData.get({ plain: true });
    
    // Pass serialized data and session flag into template
      res.render('mainpage', {
         user,
        logged_in: req.session.logged_in
      });
  
  } catch (err) {
    console.log(err);
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

  res.render('signUpPage');
});



