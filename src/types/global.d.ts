import type { Logger } from 'winston';

declare global {
  // eslint-disable-next-line no-var
  var Log: Logger;
}

export {};

