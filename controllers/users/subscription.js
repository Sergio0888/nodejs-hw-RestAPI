const {User} = require("../../models/user");

const subscription = async(req, res) => {
    const {_id} = req.user;
    const {subscription} = req.body;
    await User.findByIdAndUpdate(_id, {subscription});
    res.json({
       message: `Your subscription has been changed to ${subscription}`
    })
};

module.exports = subscription;