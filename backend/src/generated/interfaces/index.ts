/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface ExecuteCommandType {
  args?: ({
    type: string;
    value?: string | number;
  })[];
  command: string;
  userId: string;
}
