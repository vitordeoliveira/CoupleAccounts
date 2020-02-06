const { Banks } = require("../../models");

module.exports = {
  async index(req, res) {
    try {
      const { wallet_id } = req.user;
      const banks = await Banks.findAll({
        where: {
          wallet_id
        }
      });
      return res.json({ banks });
    } catch (error) {}
  },

  async store(req, res) {
    try {
      const { wallet_id } = req.user;

      const { name, balance } = req.body;

      if (!name) {
        return res.status(400).json({ msg: "Nome e um campo obrigatorio" });
      }

      const bank = await Banks.create({
        name,
        wallet_id,
        balance
      });

      return res.json(bank);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ err: "Error!" });
    }
  },

  async update(req, res) {
    const { wallet_id } = req.user;
    const { bank_id } = req.params;
    const formdata = req.body;

    const bank = await Banks.findByPk(bank_id);

    if (!(bank.wallet_id === wallet_id)) {
      return res
        .status(403)
        .json({ msg: "Carteira nao corresponde com o banco em questao!" });
    }

    bank.set(formdata);
    const newbank = await bank.save();

    return res.json(newbank);
  },

  async destroy(req, res) {
    try {
      const { wallet_id } = req.user;
      const { bank_id } = req.params;

      const bank = await Banks.findByPk(bank_id);

      if (!bank) {
        return res.status(404).json({ msg: "Este banco nao existe!" });
      }

      if (!(bank.wallet_id === wallet_id)) {
        return res
          .status(403)
          .json({ msg: "Carteira nao corresponde com o banco em questao!" });
      }

      const deleted = await bank.destroy();

      return res.json(deleted);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};
