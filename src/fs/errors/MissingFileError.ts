import { buildErrorMessageFrom } from '../../utils';
import { MISSING_FILE_ERROR_BASE_MSG as baseMsg } from '../const';

export class MissingFileError extends Error {
  constructor(msg?: string, filename?: string) {
    super(buildErrorMessageFrom(msg && msg.length > 0 ? msg : baseMsg, filename));
    Object.setPrototypeOf(this, MissingFileError.prototype);
    this.name = 'MissingFileError';
  }
}
