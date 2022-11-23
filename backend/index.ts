import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
import bodyParser, { json } from 'body-parser';
import { ExecuteCommandType } from './src/generated/interfaces';
import { ExecuteCommandSchema } from './src/schemas';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// enable cors
app.use(cors());
// @ts-ignore
app.options('*', cors());

// create application/json parser
var jsonParser = bodyParser.json()

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!!');

  exec("python3 example.py chine", (error: any, stdout: string, stderr: string) => {
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

app.post('/execute', jsonParser, async (req: Request, res: Response) => {
  const validatedParams: ExecuteCommandType = await ExecuteCommandSchema.validateAsync(req.body);

  // build the command
  let commandArgs = ''
  if (validatedParams.args) {

    for (let arg of validatedParams.args) {
      commandArgs += `${arg.value} `;
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
