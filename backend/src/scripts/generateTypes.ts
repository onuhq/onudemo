import { convertFromDirectory } from 'joi-to-typescript';

convertFromDirectory({
  schemaDirectory: './src/schemas',
  typeOutputDirectory: './src/generated/interfaces',
  debug: true
});
