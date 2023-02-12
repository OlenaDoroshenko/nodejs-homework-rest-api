const Jimp = require("jimp");
const path = require("node:path");
const fs = require("node:fs/promises");

const updateUserAvatar = async (id, { path: uploadPath, originalname }) => {
  const [, extension] = originalname.split(".");
  const newFileName = `${id}.${extension}`;

  Jimp.read(uploadPath, (err, image) => {
    if (err) throw err;
    image.resize(250, 250).write(`public/avatars/${newFileName}`);
  });

  fs.rename(uploadPath, `public/avatars/${newFileName}`)

  const avatarURL = path.join(`http://localhost:${process.env.PORT}/avatars`, newFileName);

  return avatarURL
};

module.exports = { updateUserAvatar };
