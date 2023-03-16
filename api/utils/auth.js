import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const curToken = req.cookies.access_token;
  // if there is no token -> not authenticated
  if (!curToken) return next(createError(401, "You are not authenticated"));

  // verify jwt token
  jwt.verify(curToken, process.env.JWT, (err, userData) => {
    // if failed to verify, token is invalid
    if (err) return next(createError(403, "Token is not valid!"));

    // set current user as userData
    // NOTES: req.user can be req.[anything]
    req.user = userData;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  // NOTES: req.params.id is from  router.get("/check-user/:id ...
  verifyToken(req, res, next, () => {
    // if id from user data, from cookie token = param id OR user is admin
    // proceed to execute following route endpoint
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  // NOTES: req.params.id is from  router.get("/check-user/:id ...
  verifyToken(req, res, next, () => {
    // if user is admin
    // proceed to execute following route endpoint
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not administrator"));
    }
  });
};
