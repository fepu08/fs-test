import { DirectoryDoesNotExistError } from '../errors/DirectoryDoesNotExistError';
import { InvalidParamsError } from '../errors/InvalidParamsError';
import { join, resolve } from 'node:path';
import fs from 'fs';
import FS from '../FS';
import { FileAlreadyExistsError } from '../errors/FileAlreadyExistsError';
import crypto from 'crypto';

const rootDir = join(resolve(), 'src', 'mocks');
const fileName = 'test-file-created';
const path = join(rootDir, fileName);
const content1 = 'a very long string 1';
const content2 = 'a very long string 2';
const content1Hashed = crypto.createHash('md5').update(content1).digest('hex');
const content2Hashed = crypto.createHash('md5').update(content2).digest('hex');
const testFileName = 'test-file';

const globalFS = new FS(rootDir);

const cleanup = async () => {
  try {
    const files = await fs.promises.readdir(rootDir);
    for (const file of files) {
      if (file === testFileName || file == content1Hashed) {
        continue;
      }
      const filePath = join(rootDir, file);
      await fs.promises.unlink(filePath);
    }
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
};

describe('FS', () => {
  beforeEach(async () => {
    await cleanup();
  });

  afterAll(async () => {
    await cleanup();
  });

  describe('constructor', () => {
    test('create FS object with provided argument', () => {
      const dir = './';

      const fs = new FS(dir);

      expect(fs.rootDir).toBe(dir);
    });

    test.each([undefined, null, {}, [], 123, true, '', 'ioawhegopnweg'])('invalid arguments: %s', (rootDir) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(() => new FS(rootDir)).toThrow(DirectoryDoesNotExistError);
    });
  });

  describe('store()', () => {
    describe('validate params', () => {
      test.each([null, undefined, {}, [], '', 123, true])('invalid filename %s', async (filename) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await expect(globalFS.store(filename, './')).rejects.toThrow(InvalidParamsError);
      });

      test.each([null, undefined, {}, [], '', 123, true])('invalid content %s', async (content) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await expect(globalFS.store('./', content)).rejects.toThrow(InvalidParamsError);
      });

      test('valid params', () => {
        expect(async () => await globalFS.store(fileName, content1)).not.toThrow();
      });
    });

    test('file created and content passed', async () => {
      await globalFS.store(fileName, content1);

      const content = await fs.promises.readFile(path, { encoding: 'utf-8' });

      expect(content).toBe(content1);
    });

    test('file already exists', async () => {
      await expect(globalFS.store(testFileName, content1)).rejects.toThrow(FileAlreadyExistsError);
    });
  });

  describe('get()', () => {
    describe('validate params', () => {
      test.each([null, undefined, {}, [], '', 123, true])('invalid filename %s', async (filename) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await expect(globalFS.get(filename)).rejects.toThrow(InvalidParamsError);
      });

      test('valid params', async () => {
        await globalFS.store(fileName, content1);
        expect(async () => await globalFS.get(fileName)).not.toThrow();
      });
    });

    test('get content of file', async () => {
      await globalFS.store(fileName, content1);

      expect(await globalFS.get(fileName)).toBe(content1);
    });
  });

  describe('storedHash()', () => {
    describe('validate params', () => {
      test.each([null, undefined, {}, [], '', 123, true])('invalid content %s', async (content) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await expect(globalFS.storeWithHash(content)).rejects.toThrow(InvalidParamsError);
      });

      test('valid params', () => {
        expect(async () => await globalFS.store(fileName, content1)).not.toThrow();
      });

      test('file already exists', async () => {
        await expect(globalFS.storeWithHash(content1)).rejects.toThrow(FileAlreadyExistsError);
      });
    });
  });

  test('file created and content passed', async () => {
    await globalFS.storeWithHash(content2);

    expect(await globalFS.get(content2Hashed)).toBe(content2);
  });

  test('in case of trying to push the same content twice throw FileAlreadyExistsError', async () => {
    await globalFS.storeWithHash(content2);

    await expect(globalFS.storeWithHash(content2)).rejects.toThrow(FileAlreadyExistsError);
  });
});
