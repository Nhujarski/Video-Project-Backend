const UserModel = require('../model/user');

// Create and save new user to db

exports.create = async (req, res) => {
  if (!req.body.userName && !req.body.password) {
    res.status(400).send({ messgae: 'Content can not be empty!' });
  }

  const user = new UserModel({
    userName: req.body.userName,
    password: req.body.password,
  });

  await user
    .save()
    .then((data) => {
      res.send({
        message: 'User created successfully!',
        user: data,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || 'Some error occured while creating user',
      });
    });
};

// find user with an id for login
exports.findOne = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
