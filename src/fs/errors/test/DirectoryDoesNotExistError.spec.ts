import { DirectoryDoesNotExistError } from '../DirectoryDoesNotExistError';
import { DIRECTORY_DOES_NOT_EXISTS_BASE_MSG as baseMsg } from '../../const';

const directory = 'test-file.txt';
describe('DirectoryDoesNotExistError', () => {
  test.each([
    [undefined, undefined, baseMsg],
    [undefined, directory, `${baseMsg}: ${directory}`],
    ['test msg', '', 'test msg'],
    ['test msg', directory, `test msg: ${directory}`],
    ['', directory, `${baseMsg}: ${directory}`],
  ])('DirectoryDoesNotExistError(%s, %s)', (msg, directory, expected) => {
    expect(() => {
      throw new DirectoryDoesNotExistError(msg, directory);
    }).toThrow(expected);
  });
});
