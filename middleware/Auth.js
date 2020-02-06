const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("x-auth-acc");

  if (!authHeader) return res.status(401).json({ error: "error!" });

  const parts = authHeader.split(" ");

  if (!parts.lenght === 2) return res.status(401).json({ error: "error!" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "error!" });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "error!" });

    req.user = decoded.payload;
    return next();
  });
};
