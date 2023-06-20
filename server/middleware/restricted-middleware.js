const restricted = (req, res, next) => {
  if (req.session && req.session.user) {
    // console.log(req.session.user.username);
    next();
  } else {
    console.log(req.session.user);
    res.status(401).json({ message: "invalid credentials" });
  }
};

module.exports = restricted;
