const jwt = require("jsonwebtoken");

const checkAdmin = (req, res, next) => {
  try {
    const token = req.cookies.authToken || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.roles.includes("admin")) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = checkAdmin;
