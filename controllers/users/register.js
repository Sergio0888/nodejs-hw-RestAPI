const bcrypt = require('bcryptjs');
const {User} = require("../../models/user");
const gravatar = require('gravatar');
const nanoid = require("nanoid");

const {RequestError, sendMail} = require("../../helpers")

const {BASE_URL} = process.env;

const register = async(req, res) => {
    const {name, email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw RequestError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const verificationToken = nanoid();

    const avatarURL = gravatar.url(email);

    const newUser = await User.create({ name, email, password: hashPassword, avatarURL});
    console.log(newUser)

    const mail = {
        to: email,
        subject: "Подтверждение регистрации",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Подтвердить</a>`
    }

    await sendMail(mail)

    res.status(201).json({
        email: newUser.email,
        password: newUser.password,
        verificationToken: newUser.verificationToken,
    })
}

module.exports = register;