const { Banks } = require("../../models");

module.exports = {
  async index(req, res) {
    try {
      const { wallet_id } = req.params;
      const banks = await Banks.findAll({
        where: {
          wallet_id
        }
      });
      return res.json(banks);
    } catch (error) {}
  },

  async store(req, res) {
    try {
      const {
        name,
        balance,
        taxesDecimal,
        taxesPercentage,
        interest,
        yieldDecimal,
        yieldPercentage
      } = req.body;
      const { wallet_id } = req.params;
      if (!name) {
        return res.status(400).json({ msg: "Nome é um campo obrigatório" });
      }

      const bank = await Banks.create({
        name,
        wallet_id,
        balance,
        taxesDecimal,
        taxesPercentage,
        interest,
        yieldDecimal,
        yieldPercentage
      });

      return res.json(bank);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ err: "Error!" });
    }
  }
};
