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
const dotenv_1 = __importDefault(require("dotenv"));
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const body_parser_1 = __importDefault(require("body-parser"));
const schemas_1 = require("./src/schemas");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// create application/json parser
var jsonParser = body_parser_1.default.json();
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server!!');
    exec("python3 example.py chine", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
});
app.post('/execute', jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedParams = yield schemas_1.ExecuteCommandSchema.validateAsync(req.body);
    // build the command
    let commandArgs = '';
    if (validatedParams.args) {
        for (let arg of validatedParams.args) {
            commandArgs += `${arg.value} `;
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
