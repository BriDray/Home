const router = require('express').Router();
const { Item } = require('../../models');

// DATABASE
// Get and post

// Make items list
router.get('/', (req, res) =>
          res.json(database))

// Add new items
router.post('/', (req, res) => {
      let jsonFilePath = path.join(__dirname, './db/db.json');
      let newNotes ;

      newNotes.id = uuidv4();
      console.log(newNotes);

      database.push(newNotes);
    });

module.exports = router;