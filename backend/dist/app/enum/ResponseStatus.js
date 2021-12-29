"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseStatus = void 0;
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["NotFound"] = 404] = "NotFound";
    ResponseStatus[ResponseStatus["Unauthorized"] = 401] = "Unauthorized";
    ResponseStatus[ResponseStatus["BadRequest"] = 400] = "BadRequest";
    ResponseStatus[ResponseStatus["Sucess"] = 200] = "Sucess";
    ResponseStatus[ResponseStatus["Conflict"] = 409] = "Conflict";
})(ResponseStatus = exports.ResponseStatus || (exports.ResponseStatus = {}));
