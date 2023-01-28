const jwt = require("jsonwebtoken");

exports.roleMiddleware = (req, res, next) => {
  const token = req.headers.authorization ?? null;
  if (!token) return res.send("Authorization token is required");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) return res.send("Unauthorized");

    if (!payload.user.roles.includes("admin")) {
      return res.status(403).send("Permission denied");
    }
    console.log(payload.user.roles);
    next();
  } catch (error) {
    res.send({error});
  }
};