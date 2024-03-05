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

// find user with an userName and password for login
exports.findOne = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await UserModel.findOne({ userName });

    if (user) {
      // Check if the provided password matches the stored password
      const isPasswordValid = await user.comparePassword(password);

      if (isPasswordValid) {
        // Exclude sensitive information like the password before sending the response
        const { password, ...userWithoutPassword } = user.toObject();

        res.status(200).json(userWithoutPassword);
      } else {
        res.status(401).json({ message: 'Invalid password' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
