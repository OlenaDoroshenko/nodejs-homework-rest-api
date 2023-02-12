const users = require("../services/users");
const { updateUserAvatar } = require("../services/avatars");
// const { ParameterError, NotAuthorizedError } = require("../helpers/errors");

const userSignUpController = async (req, res) => {
  const { email, password, subscription } = req.body;
  const newUser = await users.signUpUser(email, password, subscription);
  res.status(201).json(newUser);
};

const userLoginController = async (req, res) => {
  const { email, password } = req.body;
  const data = await users.loginUser(email, password);
  res.json(data);
};

const userLogoutController = async (req, res) => {
  await users.logoutUser(req.user._id);
  res.sendStatus(204);
};

const userCurrentController = async (req, res) => {
  const user = req.user;
  res.json({ email: user.email, subscription: user.subscription });
};

const userSubscriptionController = async (req, res) => {
  const user = await users.updateUserSubs(req.user._id, req.body.subscription);
  res.json(user);
};

const userAvatarController = async (req, res) => {
  const avatarURL = await updateUserAvatar(req.user._id, req.file);
  const user = await users.updateAvatarUrl(req.user._id, avatarURL);
  res.json(user);
};

module.exports = {
  userSignUpController,
  userLoginController,
  userLogoutController,
  userCurrentController,
  userSubscriptionController,
  userAvatarController,
};
