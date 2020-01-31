const { CoupleAccount, User } = require("../../models");
const { Op } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const account = await CoupleAccount.findAll({
        include: [
          {
            model: User,
            as: "Users",
            through: { attributes: [] }
          }
        ]
      });
      return res.json(account);
    } catch (error) {
      console.log(error);
    }
  },
  async show(req, res) {
    const { id } = req.params;

    const account = await CoupleAccount.findAll({
      include: [
        {
          model: User,
          as: "Users",
          through: { attributes: [] }
        }
      ],
      where: {
        id
      }
    });

    return res.json(account);
  },
  async destroy(req, res) {
    const { id } = req.params;
    const { user_id } = req.body;
    const account = await CoupleAccount.findByPk(id, {
      include: [
        {
          model: User,
          as: "Users",
          through: { attributes: [] }
        }
      ]
    });

    const newacc = await account.removeUser(user_id);

    return res.json(newacc);
  }
};
