const { Wallet, Banks } = require("../../models");

module.exports = {
  async index(req, res) {
    const { wallet_id } = req.user;

    const info = await Wallet.findAll({
      where: {
        id: wallet_id
      },
      include: [
        {
          model: Banks,
          as: "Banks"
        }
      ]
    });

    return res.json(info);
  }
};
