const { Router } = require("express");

// Controllers
const AuthController = require("./Controllers/AuthController");

const UserController = require("./Controllers/UserController");
const UserAccountController = require("./Controllers/UserAccountController");
const UserBanksController = require("./Controllers/UserBanksController");

const WalletController = require("./Controllers/WalletController");

const AccountController = require("./Controllers/AccountController");
const BankController = require("./Controllers/BankController");

// Middlewares
const Auth = require("../middleware/Auth");
// Routes
const routes = Router();

//Auth
routes.post("/login", AuthController.login);

//User
routes.get("/user", UserController.index);
routes.post("/user", UserController.store);

// Wallet
routes.get("/user/wallet", Auth, WalletController.index);

// User _ CoupleAccounts
routes.get("/user/couple", Auth, UserAccountController.index);
routes.post("/user/couple", Auth, UserAccountController.store);
routes.patch("/user/couple/:account_id", Auth, UserAccountController.create);

// User _ Bank
routes.get("/user/bank", Auth, UserBanksController.index);
routes.post("/user/bank", Auth, UserBanksController.store);
routes.put("/user/bank/:bank_id", Auth, UserBanksController.update);
routes.delete("/user/bank/:bank_id", Auth, UserBanksController.destroy);

// CoupleAccounts
routes.get("/coupleacc", AccountController.index);
routes.get("/coupleacc/:id", AccountController.show);
routes.delete("/coupleacc/:id", AccountController.destroy);

// Bank
// routes.put("/bank/correction", Auth, BankController.update);

module.exports = routes;
