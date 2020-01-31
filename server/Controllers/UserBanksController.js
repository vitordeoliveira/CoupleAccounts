const { Banks } = require("../../models");

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

      const user = await User.create({ name, email });
      const wallet = await user.createWallet(user);

      if (user) {
        user.wallet_id = wallet.id;
      }
      const newUser = await user.save();

      return res.json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ err: "Error!" });
    }
  }
};
