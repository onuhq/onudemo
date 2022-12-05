import Joi from "joi";

let arg = Joi.object().keys({
  type: Joi.string().required(),
  value: [Joi.string(), Joi.number()],
})

export const ExecuteCommandSchema = Joi.object({
  command: Joi.string()
    .min(1)
    .max(100)
    .required(),
  args: Joi.array()
    .items(arg)
}).meta({ className: 'ExecuteCommandType' });
