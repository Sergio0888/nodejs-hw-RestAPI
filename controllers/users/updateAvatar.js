const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');

const {User} = require('../../models/user');

const avatarsPath = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
    const {_id} = req.user;
    const {path: tempUpload, originalname} = req.file;
    const fileName = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsPath, fileName);
    await fs.rename(tempUpload, resultUpload);
    const resizeImage = await Jimp.read(resultUpload);
    resizeImage.resize(250, 250).write(resultUpload);
    const avatarURL = path.join("avatars", fileName);
    await User.findByIdAndUpdate(_id, {avatarURL});
    res.json({
        avatarURL
    })
}

module.exports = updateAvatar;