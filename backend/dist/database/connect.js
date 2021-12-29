"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
typeorm_1.createConnection().then(function () { return console.log('📦 Sucessfully connected to tickets Database'); });
/**
 * Usado para funcionar mysql no TypeOrm ⬇️
 * ALTER USER 'root'@'localhost' IDENTIFIED BY ''
 * ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY ''
 */ 
