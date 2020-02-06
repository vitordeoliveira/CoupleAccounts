const { Banks } = require("../../models");

module.exports = {
  async index(req, res) {
    try {
    } catch (error) {}
  },

  async update(req, res) {
    try {
      const { wallet_id } = req.user;
      const banks = await Banks.findAll({
        where: {
          wallet_id
        }
      });

      banks.forEach(bank => {
        const increment =
          bank.yieldPercentage * bank.balance + Number(bank.yieldDecimal);
        const decrement =
          Number(bank.taxesDecimal) + bank.taxesPercentage * bank.balance;

        const newBalance = Number(bank.balance) + increment - decrement;
        bank.update({ balance: newBalance }, { fields: ["balance"] });
      });

      return res.json(banks);
    } catch (error) {
      console.log(error);
    }
  }
};
