import { FileAlreadyExistsError } from '../FileAlreadyExistsError';
import { FILE_ALREADY_EXISTS_ERROR_BASE_MSG as baseMsg } from '../../const';

const fileName = 'test-file.txt';
describe('FileAlreadyExistsError', () => {
  test.each([
    [undefined, undefined, baseMsg],
    [undefined, fileName, `${baseMsg}: ${fileName}`],
    ['test msg', '', 'test msg'],
    ['test msg', fileName, `test msg: ${fileName}`],
    ['', fileName, `${baseMsg}: ${fileName}`],
  ])('FileAlreadyExistsError(%s, %s)', (msg, fileName, expected) => {
    expect(() => {
      throw new FileAlreadyExistsError(msg, fileName);
    }).toThrow(expected);
  });
});
