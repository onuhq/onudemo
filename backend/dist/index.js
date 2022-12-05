"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const body_parser_1 = __importDefault(require("body-parser"));
const schemas_1 = require("./src/schemas");
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./src/config"));
const app = (0, express_1.default)();
const port = config_1.default.port;
// enable cors
app.use((0, cors_1.default)({
    origin: `http://localhost:${config_1.default.clientPort}`,
    methods: "GET,POST",
    credentials: true,
    maxAge: 3600,
}));
// create application/json parser
var jsonParser = body_parser_1.default.json();
app.post('/execute', jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedParams = yield schemas_1.ExecuteCommandSchema.validateAsync(req.body);
    // build the command
    let commandArgs = '';
    if (validatedParams.args) {
        for (let arg of validatedParams.args) {
            if (arg.type === 'string') {
                commandArgs += `'${arg.value}' `;
            }
            else {
                commandArgs += `${arg.value} `;
            }
        }
    }
    const command = `${validatedParams.command} ${commandArgs}`.trimEnd();
    let output = {
        stdout: '',
        stderr: ''
    };
    try {
        output = yield exec(command);
    }
    catch (error) {
        output = {
            stdout: error.stdout,
            stderr: error.stderr
        };
    }
    res.send({
        output,
    });
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
