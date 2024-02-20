const jwt = require("jsonwebtoken");
const User = require("../../models/User.js");

const NOT_AUTH = "Not authorized";
const NOT_AUTH_NO_TOKEN = "Not authorized, no token";

async function getUser(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return { status: 401, response: NOT_AUTH_NO_TOKEN };
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      return { status: 200, response: user };
    } catch (error) {
      console.log(error);

      return { status: 401, response: NOT_AUTH };
    }
  }
  return { status: 401, response: NOT_AUTH };
}

module.exports = { getUser, notAuthorizedMessage: NOT_AUTH };
