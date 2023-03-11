const { User } = require("../db/userModel");
const {
  NotAuthorizedError,
  ConflictError,
  ParameterError,
} = require("../helpers/errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const nodemailer = require("nodemailer");

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "olena.doroshenko@meta.ua",
    pass: process.env.PASSWORD,
  },
};

// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID)

const signUpUser = async (email, password, subscription) => {
  const result = await User.findOne({ email });
  if (result) {
    throw new ConflictError("Email in use");
  }
  const verificationToken = uuidv4();

  const newUser = new User({
    email,
    password: await bcrypt.hash(password, 10),
    subscription,
    avatarURL: gravatar.url(email),
    verificationToken,
  });
  await newUser.save();

  // const msg = {
  //   to: email,
  //   from: 'dlsolna@gmail.com',
  //   subject: 'Verify your email',
  //   text: `Please, confirm your email address POST http://localhost:${process.env.PORT}/api/users/verify/${verificationToken}`,
  //   html: `Please, confirm your email address POST http://localhost:${process.env.PORT}/api/users/verify/${verificationToken}`,
  // };
  // await sgMail.send(msg);
  // sgMail
  // .send(msg)
  // .then(() => {
  //   console.log('Email sent')
  // })
  // .catch((error) => {
  //   console.error(error)
  // })

  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: "olena.doroshenko@meta.ua",
    to: email,
    subject: "Verify your email",
    text: `Please, confirm your email address POST http://localhost:${process.env.PORT}/api/users/verify/${verificationToken}`,
  };

  transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));

  return newUser;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email, verify: true });
  if (!user) {
    throw new NotAuthorizedError(`Email is wrong`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError(`Password is wrong`);
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  const loggedUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  ).select({
    __v: 0,
    password: 0,
    _id: 0,
  });
  return loggedUser;
};

const logoutUser = async (id) => {
  await User.findByIdAndUpdate(id, { token: null });
};

const authUser = async (id, token) => {
  const user = await User.findById(id);
  if (!user) {
    throw new NotAuthorizedError(`Not Authorized`);
  }

  if (token !== user.token) {
    throw new NotAuthorizedError(`Not Authorized`);
  }

  return user;
};

const updateUserSubs = async (id, subscription) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $set: { subscription } },
    { new: true }
  ).select({ email: 1, subscription: 1 });
  return user;
};

const updateAvatarUrl = async (id, avatarURL) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $set: { avatarURL } },
    { new: true }
  ).select({ email: 1, avatarURL: 1 });
  return user;
};

const verificationConfirmation = async (verificationToken) => {
  const user = await User.findOneAndUpdate(
    { verificationToken },
    { $set: { verify: true, verificationToken: null } },
    { new: true }
  );

  if (!user) {
    throw new ParameterError(`User not found`);
  }

  return user;
};

const secondVerificationConfirmation = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ParameterError(`User not found`);
  }

  if (user.verify) {
    throw new ParameterError(`"Verification has already been passed"`);
  }

  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: "olena.doroshenko@meta.ua",
    to: email,
    subject: "Verify your email",
    text: `Please, confirm your email address POST http://localhost:${process.env.PORT}/api/users/verify/${user.verificationToken}`,
  };

  transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));

  return user.email;
};

module.exports = {
  signUpUser,
  loginUser,
  logoutUser,
  authUser,
  updateUserSubs,
  updateAvatarUrl,
  verificationConfirmation,
  secondVerificationConfirmation,
};
