const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {

    const userData = await User.findAll([
        attributes: { exclude: "password" }
    ])
})


module.exports = router;