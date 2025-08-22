import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    req.user = decoded;


    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");

    next();      

  } catch (err) {
    console.error(err);
    return res.redirect("/login");
  }
};

export default authenticate;
