"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuteCommandSchema = void 0;
const joi_1 = __importDefault(require("joi"));
let arg = joi_1.default.object().keys({
    type: joi_1.default.string().required(),
    value: [joi_1.default.string(), joi_1.default.number()],
});
exports.ExecuteCommandSchema = joi_1.default.object({
    userId: joi_1.default.string()
        .min(1)
        .max(100)
        .required(),
    command: joi_1.default.string()
        .min(1)
        .max(100)
        .required(),
    args: joi_1.default.array()
        .items(arg)
}).meta({ className: 'ExecuteCommandType' });
