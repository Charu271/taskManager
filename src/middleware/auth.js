const jwt = require("jsonwebtoken");
const user = require("../models/Users.js");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const User = await user.findOne({ _id: decode._id, "tokens.token": token });
    if (!User) {
      throw new Error();
    }
    req.token = token;
    req.User = User;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please Authorize" });
  }
};
module.exports = auth;
