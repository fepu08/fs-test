import { MissingFileError } from '../MissingFileError';
import { MISSING_FILE_ERROR_BASE_MSG as baseMsg } from '../../const';

const fileName = 'test-file.txt';
describe('MissingFileError', () => {
  test.each([
    [undefined, undefined, baseMsg],
    [undefined, fileName, `${baseMsg}: ${fileName}`],
    ['test msg', '', 'test msg'],
    ['test msg', fileName, `test msg: ${fileName}`],
    ['', fileName, `${baseMsg}: ${fileName}`],
  ])('MissingFileError(%s, %s)', (msg, fileName, expected) => {
    expect(() => {
      throw new MissingFileError(msg, fileName);
    }).toThrow(expected);
  });
});
