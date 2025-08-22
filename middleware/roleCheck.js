import jwt from "jsonwebtoken";

const roleCheck = (requiredRole) => {
  return (req, res, next) => {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).send(" login first");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;


      if (decoded.role !== requiredRole) {
        return res.status(403).send(" You do not have access");
      }

      next(); 

    } catch (err) {
      console.error(err);
      return res.status(401).send("invalid or expired token");
    }
  };
};

export default roleCheck;
