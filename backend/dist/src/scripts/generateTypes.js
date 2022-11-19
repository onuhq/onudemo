"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_to_typescript_1 = require("joi-to-typescript");
(0, joi_to_typescript_1.convertFromDirectory)({
    schemaDirectory: './src/schemas',
    typeOutputDirectory: './src/generated/interfaces',
    debug: true
});
