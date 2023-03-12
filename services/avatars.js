const Jimp = require("jimp");
const fs = require("node:fs/promises");

const updateUserAvatar = async (id, { path: uploadPath, filename }) => {

  Jimp.read(uploadPath, (err, image) => {
    if (err) throw err;
    image.resize(250, 250).write(`public/avatars/${filename}`);
  });

  fs.unlink(uploadPath)

  const avatarURL = `/avatars/${filename}`;

  return avatarURL
};

module.exports = { updateUserAvatar };
