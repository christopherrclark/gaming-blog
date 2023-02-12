const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


//! The following ties in with the "login" HTML page to obtain the req.body

// "/api/users"
//Get all Users
router.get('/', async (req, res) => {
  try {
    //Make sure the password isn't returned for security reasons  
    let getAllUsers = await User.findAll({ attributes: { exclude: ['password']}});

    res.json(getAllUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Create a User
router.post('/', async (req, res) => {
  try {
    const createUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })

    req.session.save(() => {
      req.session.user_id = createUser.id;
      req.session.username = createUser.username;
      req.session.logged_in = true;
      res.json(createUser)
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err })
  }
});

//Get a specific User
router.get('/:id', async (req, res) => {
  const specificUser = req.params.id;
  try {
    const getSpecificUser = await User.findOne({
      attributes: { exclude: ['password']},
      where: {
        id: specificUser
      },
      include: [{
        model: Post,
        attributes: [
          'user_id',
          'post_date',
          'post_title',
          'post_content'
        ]
      },
      {
        model: Comment,
        attributes: ['id', 'comment_date', 'comment_content'],
        include: {
          model: Post,
          attributes: ['title']
        }
      },
      {
        model: Post,
        attributes: ['title']
    }]});
    if (!getSpecificUser) {
      res.status(404).json({ message: 'No user found with this id' })
      return;
    } else {
      res.json(getSpecificUser)
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//Update a specific user
router.put('/:id', async (req, res) => {
  const specificUser = req.params.id;
  try {
    let updateSpecificUser = await User.update({
      individualHooks: true,
      where: {
        id: specificUser
      }
    })
    if(!updateSpecificUser[0]) {
      res.status(404).send("Sorry, no user found!")
      return
    } else {
      res.json(updateSpecificUser);
    }
  } catch (err) {
    console.log(err);
    res.statusMessage(500).json(err)
  }
});

//Delete a specific user
router.delete('/:id', async (req, res) => {
  const findSpecificUser = req.params.id;
  try {
    let getSpecificUser = User.destroy({
      where: {
        id: findSpecificUser
      }
    })
      if (!getSpecificUser) {
        res.status(404).send("Sorry, no user found with this id!")
      } else {
        res.json(getSpecificUser)
      }
    } catch (err) {
      console.log(err);
      res.statusMessage(500).json(err)
    }
});

//User validation for a log in
router.post('/login', async (req, res) => {
  let userEmail = req.body.email;
  try {
    let log = ("checking login API router firing")
    const findUser = await User.findOne({
      where: {
        email: userEmail
      }
    })

    if (!findUser) {
      res.status(400).send("Sorry, could not find that email!");
      return;
    } 

    const passwordCheck = findUser.checkPassword(req.body.password);

    if (!passwordCheck) {
      res.status(400).send("Sorry, this is an incorrect password!")
      return
    }
    req.session.save(() => {
      req.session.user_id = findUser.id;
      req.session.username = findUser.username;
      req.session.logged_in = true;
      res.send("Log in Successful")
    })
    } catch (err) {
    console.log(err);
    res.statusMessage(500).json(err)
  }
});

//Log the user out and kill the session
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.logged_in = false;
      req.session.destroy(() => {
          res.status(204).end();
      });
  } else {
      res.status(404).end();
  }
});

module.exports = router;
