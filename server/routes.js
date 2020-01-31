const { Router } = require("express");

// Controllers
const UserController = require("./Controllers/UserController");
const UserAccountController = require("./Controllers/UserAccountController");

const AccountController = require("./Controllers/AccountController");
const BankController = require("./Controllers/BankController");

// Middlewares

// Routes
const routes = Router();

routes.get("/user", UserController.index);
routes.post("/user", UserController.store);

// User Controller CoupleAccounts
routes.get("/user/couple/:id", UserAccountController.index);
routes.post("/user/couple", UserAccountController.store);
routes.patch("/user/couple/:id", UserAccountController.create);

routes.get("/coupleacc", AccountController.index);
routes.get("/coupleacc/:id", AccountController.show);
routes.delete("/coupleacc/:id", AccountController.destroy);

routes.get("/bank/:wallet_id", BankController.index);
routes.post("/bank/:wallet_id", BankController.store);

module.exports = routes;
