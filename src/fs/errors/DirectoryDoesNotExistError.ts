import { buildErrorMessageFrom } from '../../utils';
import { DIRECTORY_DOES_NOT_EXISTS_BASE_MSG as baseMsg } from '../const';

export class DirectoryDoesNotExistError extends Error {
  constructor(msg?: string, dir?: string) {
    super(buildErrorMessageFrom(msg && msg.length > 0 ? msg : baseMsg, dir));
    Object.setPrototypeOf(this, DirectoryDoesNotExistError.prototype);
    this.name = 'DirectoryDoesNotExistError';
  }
}
