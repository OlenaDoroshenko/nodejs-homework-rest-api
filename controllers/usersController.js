const users = require("../services/users");
// const { ParameterError, NotAuthorizedError } = require("../helpers/errors");

const userSignUpController = async (req, res) => {
  const {email, password, subscription} = req.body;
  const newUser = await users.signUpUser(email, password, subscription);
  res.status(201).json(newUser);
};

const userLoginController = async (req, res) => {
  const {email, password} = req.body;
  const data = await users.loginUser(email, password);
  res.json(data);
};

const userLogoutController = async (req, res) => {
  await users.logoutUser(req.user._id);
  res.sendStatus(204)
};

const userCurrentController = async (req, res) => {
  const user = await users.currentUser(req.user._id);
  res.json(user)
};

const userSubscriptionController = async(req,res) => {
  const user = await users.updateUserSubs(req.user._id, req.body.subscription);
res.json(user)
}



module.exports = {
    userSignUpController,
    userLoginController,
    userLogoutController,
    userCurrentController,
    userSubscriptionController,
};
