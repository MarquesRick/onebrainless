"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var User = /** @class */ (function () {
    function User() {
    }
    //Para gerar hash na senha automaticamente
    //yarn add bcryptjs
    //yarn add @types/bcryptjs -D
    User.prototype.hashPassword = function () {
        this.password = bcryptjs_1.default.hashSync(this.password, 8);
    };
    __decorate([
        typeorm_1.PrimaryColumn({ name: 'id_user' }),
        __metadata("design:type", Number)
    ], User.prototype, "idUser", void 0);
    __decorate([
        typeorm_1.Column({ name: 'username' }),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        typeorm_1.Column({ name: 'email' }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column({ name: 'password' }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column({ name: 'create_date' }),
        __metadata("design:type", Date)
    ], User.prototype, "createDate", void 0);
    __decorate([
        typeorm_1.Column({ name: 'login' }),
        __metadata("design:type", String)
    ], User.prototype, "login", void 0);
    __decorate([
        typeorm_1.BeforeInsert(),
        typeorm_1.BeforeUpdate(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], User.prototype, "hashPassword", null);
    User = __decorate([
        typeorm_1.Entity('user')
    ], User);
    return User;
}());
exports.default = User;
