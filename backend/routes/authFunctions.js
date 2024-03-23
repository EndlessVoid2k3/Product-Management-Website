const router = require("express").Router();
const Employee = require("../models/employee.js");
const jwt = require("jsonwebtoken");
const createSecretToken = (_id) => {
  return jwt.sign({ _id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

router.post("/login", async (req, res, next) => {
  try {
    const { ssn, password } = req.body;
    if (!ssn || !password) {
      return res.json({ message: "All fields are required" });
    }

    const user = await Employee.findOne({ ssn });
    if (!user) {
      return res.json({ message: "Incorrect username" });
    }

    //let auth = await bcrypt.compare(password, user.password);
    //console.log(password);
    //console.log(user.password);
    // console.log(auth);
    let auth = false;
    if (password === user.password) {
      auth = true;
    }
    if (!auth) {
      return res.json({ message: "Incorrect password ", success: false });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "User logged in successfully",
      success: true,
      token,
    });
    next();
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
