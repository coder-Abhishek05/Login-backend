const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allurls,
  });
});

router.post("/login" , async(req , res) =>{
  const { email , password } = req.body;
  try {
      
      //console.log(email, password);
      const token = await User.matchPasswordAndGenerateToken(email, password);  //
      //console.log("token", token);
      return redirect("/");
  } catch (error) {
      return res.render("signin", {
          error: "Incorrect Email or Password",
      });
      
  }
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
