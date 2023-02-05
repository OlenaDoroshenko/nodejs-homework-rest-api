const jwt = require("jsonwebtoken");

const { NotAuthorizedError } = require("../helpers/errors");

const { authUser } = require("../services/users");

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      next(
        new NotAuthorizedError(
          "Please, provide a token in request authorization header"
        )
      );
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      next(new NotAuthorizedError("Not authorized"));
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await authUser(id, token);
    req.user = user;
    next();
  } catch {
    next(new NotAuthorizedError("Not authorized"));
  }
};

module.exports = {
  authMiddleware,
};
