"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config({ path: path.join(__dirname, '../../.env') });
// const envVarsSchema = Joi.object()
//   .keys({
//     CLIENT_PORT: Joi.number().default(3000),
//     PORT: Joi.number().default(8000),
//   })
//   .unknown();
// const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
// if (error) {
//   throw new Error(`Config validation error: ${error.message}`);
// }
const config = {
    clientPort: 3000,
    port: 8000,
};
exports.default = config;
