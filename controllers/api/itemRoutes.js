const router = require('express').Router();
const { Item } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      const newItem = await Item.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newItem);
    } catch (err) {
      res.status(400).json(err);
    }
  });

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

    res.render('pengding', { 
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


// Delete item
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const itemData = await Item.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!itemData) {
        res.status(404).json({ message: 'No item found with this id!' });
        return;
      }
  
      res.status(200).json(itemData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;