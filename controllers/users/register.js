const bcrypt = require('bcryptjs');
const {User} = require("../../models/user");
const gravatar = require('gravatar');

const {RequestError} = require("../../helpers")

const register = async(req, res) => {
    const {name, email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw RequestError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email);

    const newUser = await User.create({ name, email, password: hashPassword, avatarURL});
    console.log(newUser)
    res.status(201).json({
        email: newUser.email,
        password: newUser.password
    })
}

module.exports = register;