import { buildErrorMessageFrom } from '../../utils';
import { INVALID_PARAMS_ERROR_BASE_MSG as baseMsg } from '../const';

export class InvalidParamsError extends Error {
  constructor(msg?: string, param?: string) {
    super(buildErrorMessageFrom(msg && msg.length > 0 ? msg : baseMsg, param));
    Object.setPrototypeOf(this, InvalidParamsError.prototype);
    this.name = 'InvalidParamsError';
  }
}
