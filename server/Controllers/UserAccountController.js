const { User, CoupleAccount } = require("../../models");
const { Op } = require("sequelize");

module.exports = {
  async index(req, res) {
    const { id } = req.params;

    const InAcc = await CoupleAccount.findAll({
      include: [
        {
          model: User,
          as: "Users",
          through: { attributes: [] },
          attributes: ["id"],
          where: {
            id
          }
        }
      ]
    });

    let array = [];
    InAcc.map(acc => {
      array.push(acc.id);
    });

    const account = await CoupleAccount.findAll({
      include: [
        {
          model: User,
          as: "Users",
          through: { attributes: [] }
        }
      ],
      where: {
        id: {
          [Op.in]: array
        }
      }
    });

    return res.json(account);
  },

  async store(req, res) {
    try {
      const { user_id, name } = req.body;
      const account = await CoupleAccount.create({ name });

      if (user_id) {
        account.setUsers(user_id);
      }

      return res.json(account);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ err: "Error!" });
    }
  },

  async create(req, res) {
    try {
      const { id } = req.params;
      //   const { user } = req.user;
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

      //   if (account.Users.some(user => user.id == user)) {
      //     const newacc = await account.addUser(user_id);
      //     return res.json(newacc);
      //   }
      //     return res.status(403).json({ msg: "Essa operação é invalida" });

      const newacc = await account.addUser(user_id);
      return res.json(newacc);
    } catch (error) {}
  }
};
