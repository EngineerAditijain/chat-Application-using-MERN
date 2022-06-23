const asyncHandler = require("express-async-handler");
const config = require("../config/auth.config.js");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //console.log(token)
      //decodes token id
      if (!token) {
        throw new Error('Authentication failed!');
      }
       jwt.verify(token, config.secret,  async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(401).json({
            messsage: "Not authorized, token failed"
          })
        }
        if (result) {
          req.user = await User.findById(result.id).select("-password");
          // res.status(200).json({
          //   messsage : "Success",
          //   result : req.user
          // })
          // console.log(req.user)
        }
      });
      next();


    } catch (error) {
      console.log(error);
      res.status(500).json({
        messsage: error.messsage
      })

    }
  }

  
});

module.exports = { protect };
