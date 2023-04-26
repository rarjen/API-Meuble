const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors");

function authorize(roles = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    (req, res, next) => {
      try {
        const token = req.headers["authorization"].split(" ")[1];

        if (!token) {
          throw new UnauthorizedError("You're not authorized");
        }

        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (roles.length > 0) {
          const valid = roles.find((r) => r == user.role);

          if (!valid) {
            throw new UnauthorizedError("You're not authorized");
          }
        }

        req.user = user;
        next();
      } catch (err) {
        if (err.message == "jwt malformed") {
          throw new UnauthorizedError("You're not authorized");
        }
        next(err);
      }
    },
  ];
}

module.exports = authorize;
