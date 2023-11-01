import { buildErrorMessageFrom } from '../../utils';
import { FILE_ALREADY_EXISTS_ERROR_BASE_MSG as baseMsg } from '../const';

export class FileAlreadyExistsError extends Error {
  constructor(msg?: string, filename?: string) {
    super(buildErrorMessageFrom(msg && msg.length > 0 ? msg : baseMsg, filename));
    Object.setPrototypeOf(this, FileAlreadyExistsError.prototype);
    this.name = 'FileAlreadyExistsError';
  }
}
