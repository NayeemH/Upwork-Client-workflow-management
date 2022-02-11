const router = require("express").Router();
const Domain = require("../../models/domain");

router.get("/", async (req, res, next) => {
  try {
    const { domain } = req.user;

    const domainValue = await Domain.findOne(
      { subdomain: domain },
      { __v: 0, _id: 0 }
    );

    if (!domainValue) {
      const error = Error("Domain not found");
      res.status(404);
      throw error;
    }
    // Send the response with the access Token
    res.json({
      success: true,
      data: domainValue,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
