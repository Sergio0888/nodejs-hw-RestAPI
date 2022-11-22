const {Contact} = require("../../models/contact");

const getAll = async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;

    if(req._parsedUrl.query === "favorite=true") {
        const resultFavorite = await Contact.find({owner, favorite: true}, "", {skip, limit});
        return res.json(resultFavorite);
    }
    const result = await Contact.find({owner}, "", {skip, limit});
    res.json(result);
}

module.exports = getAll;