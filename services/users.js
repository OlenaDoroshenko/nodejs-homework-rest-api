const { User } = require("../db/userModel");
const { NotAuthorizedError, ConflictError } = require("../helpers/errors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUpUser = async (email, password, subscription) => {
const result = await User.findOne({email});
    if(result) {
        throw new ConflictError('Email in use')
    }  
  const newUser = new User({email, password: await bcrypt.hash(password, 10), subscription})
  await newUser.save()
  return newUser
};

const loginUser = async (email, password) => {
  const user = await User.findOne({email});
  if (!user) {
    throw new NotAuthorizedError(`Email is wrong`);
  }

  if(!(await bcrypt.compare(password, user.password))){
    throw new NotAuthorizedError(`Password is wrong`);
  }

  const token = jwt.sign({
    id: user._id,
  }, process.env.JWT_SECRET);

  const loggedUser = await User.findByIdAndUpdate(user._id, {token}).select({__v: 0, password: 0, _id: 0})
  return loggedUser;
};

const logoutUser = async (id) => {
  const user = await User.findByIdAndUpdate(id, {token: null})
  return user;
};

const authUser = async (id, token) => {
  const user = await User.findById(id)
  if(!user) {
    throw new NotAuthorizedError(`Not Authorized`);
  }

  if(token!==user.token) {
    throw new NotAuthorizedError(`Not Authorized`);
  }

  return user;
}

const currentUser = async (id) => {
const user = await User.findById(id, {email: 1, subscription: 1, _id:0})
return user
}

const updateUserSubs = async (id, subscription) => {
  const user = await User.findOneAndUpdate(
    {_id: id},
    {$set: { subscription }},
    {new: true}
  ).select({email: 1, subscription: 1})
  return user
}


module.exports = {
  signUpUser,
  loginUser,
  logoutUser,
  authUser,
  currentUser,
  updateUserSubs
};
