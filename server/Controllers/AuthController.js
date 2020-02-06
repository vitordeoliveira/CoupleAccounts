const { User } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = {
  async login(req, res) {
    try {
      const { email } = req.body;
      const payload = await User.findOne({
        where: { email },
        attributes: ["id", "wallet_id", "name", "email"]
      });

      jwt.sign(
        { payload },
        process.env.SECRET,
        { expiresIn: "365d", subject: payload.name },
        (err, token) => {
          token = "Bearer " + token;
          return res.status(200).json({ payload, token });
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Some error occurred!" });
    }
  }
};
