const { User, Wallet } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (error) {}
  },

  async store(req, res) {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({ msg: "Preencha todos os campo" });
      }

      const findUser = await User.findOne({ where: { email } });

      if (!findUser) {
        const user = await User.create({ name, email });
        const wallet = await user.createWallet(user);

        if (user) {
          user.wallet_id = wallet.id;
        }
        const payload = await user.save();

        jwt.sign({ payload }, process.env.SECRET, (err, token) => {
          if (err) throw err;
          token = "Bearer " + token;
          return res.json({ token });
        });
      }

      jwt.sign({ payload: findUser }, process.env.SECRET, (err, token) => {
        if (err) throw err;
        token = "Bearer " + token;
        return res.json({ token });
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ err: "Error!" });
    }
  }
};
