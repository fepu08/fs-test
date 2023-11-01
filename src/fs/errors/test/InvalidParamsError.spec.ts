import { InvalidParamsError } from '../InvalidParamsError';
import { INVALID_PARAMS_ERROR_BASE_MSG as baseMsg } from '../../const';

const param = 'test-param';
describe('InvalidStoreParamsError', () => {
  test.each([
    [undefined, undefined, baseMsg],
    [undefined, param, `${baseMsg}: ${param}`],
    ['test msg', '', 'test msg'],
    ['test msg', param, `test msg: ${param}`],
    ['', param, `${baseMsg}: ${param}`],
  ])('InvalidStoreParamsError(%s, %s)', (msg, param, expected) => {
    expect(() => {
      throw new InvalidParamsError(msg, param);
    }).toThrow(expected);
  });
});
