const router = require("express").Router();
const crypto = require("crypto");
const { EmailAuth } = require("../../models/emailAuth");
const Settings = require("../../models/settings");
const bcryptjs = require("bcryptjs");
const { issueToken } = require("../../lib/JWTUtils");

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const {domain} = req.user;
    const auth = await EmailAuth.findOne({ email });

    // Check the email
    if (!auth) throw Error("Invalid Email");

    // Check the password
    const check = await bcryptjs.compare(password, auth.password);

    // If password don't matched
    if (!check) throw Error("Invalid Password");

    // Fetching the setting
    const setting = await Settings.findOne({ userId: auth.userId, domain });

    if(!setting) throw Error('You are not authorized in this domain');
    
    // Create Refresh and Access Token
    const refreshToken = await issueToken(
      { userId: auth.userId, domain: setting.domain, userType: setting.userType, tokenType: "refresh" },
      "180d"
    );

    // Setting refresh token to cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 15552000000,
      httpOnly: true,
      //  secure: true,  // This will be in production
      path: '/api/user'
    });


    // Saving the refreshToken and It's number
    const session = {
      sessionId: crypto.randomBytes(10).toString("hex"),
      refreshToken: refreshToken,
      verified: true,
    };

    setting.sessions.push(session);

    // Saving to database
    await setting.save();


    // Send the response
    res.json({
      success: true,
      msg: ["You are logged in successfully"],
    });
  } catch (err) {
    err.status = 400;
    next(err);
  }
});

module.exports = router;
