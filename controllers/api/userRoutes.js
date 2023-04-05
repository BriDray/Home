const router = require('express').Router();
const { User } = require('../../models');

// creating a new user
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        console.log(userData)
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// login
router.post('/signin', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});
//log out
router.get('/signOut', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.render('SignInPage');

        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;