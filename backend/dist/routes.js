"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = __importDefault(require("cors"));
var UserController_1 = __importDefault(require("./app/controllers/UserController"));
var TicketController_1 = __importDefault(require("./app/controllers/TicketController"));
var router = express_1.Router();
router.use(cors_1.default());
router.get('/users', UserController_1.default.getAll);
router.post('/user/save', UserController_1.default.save);
//way with params
router.get('/user/:email', function (req, res) {
    var email = req.params.email;
    UserController_1.default.getUser(email, res);
});
//another way with query string
router.get('/user', function (req, res) {
    var email = req.query.email;
    UserController_1.default.getUser(email, res);
});
//another way with query string
router.get('/login', function (req, res) {
    var email = req.query.email;
    var password = req.query.password;
    UserController_1.default.getLogin(email, password, res);
});
router.get('/ticketTypes', TicketController_1.default.getAllTicketType);
// router.get('/users', UserController.index);
// router.post('/auth', AuthController.authenticate);
exports.default = router;
