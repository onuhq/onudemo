import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
import bodyParser, { json } from 'body-parser';
import { ExecuteCommandType } from './src/generated/interfaces';
import { ExecuteCommandSchema } from './src/schemas';
import cors from 'cors';
import config from './src/config';



const app: Express = express();
const port = config.port;

// enable cors
app.use(cors({
  origin: `http://localhost:${config.clientPort}`,
  methods: "GET,POST",
  credentials: true,
  maxAge: 3600,
}));

// create application/json parser
var jsonParser = bodyParser.json()


app.post('/execute', jsonParser, async (req: Request, res: Response) => {
  const validatedParams: ExecuteCommandType = await ExecuteCommandSchema.validateAsync(req.body);

  // build the command
  let commandArgs = ''
  if (validatedParams.args) {

    for (let arg of validatedParams.args) {
      if (arg.type === 'string') {
        commandArgs += `'${arg.value}' `;
      } else {
        commandArgs += `${arg.value} `;
      }
    }
  }

  const command = `${validatedParams.command} ${commandArgs}`.trimEnd()

  let output = {
    stdout: '',
    stderr: ''
  }
  try {
    output = await exec(command);
  } catch (error: any) {
    output = {
      stdout: error.stdout,
      stderr: error.stderr
    }
  }
  res.send({
    output,
  })
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
