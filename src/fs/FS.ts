import fs, { promises as fsPromises } from 'fs';
import { join } from 'path';
import { DirectoryDoesNotExistError } from './errors/DirectoryDoesNotExistError';
import { InvalidParamsError } from './errors/InvalidParamsError';
import { FileAlreadyExistsError } from './errors/FileAlreadyExistsError';
import { MissingFileError } from './errors/MissingFileError';
import * as crypto from 'crypto';

interface FSInterface {
  /**
   * Stores the content in filename within the given directory
   * @param {string} filename
   * @param {string} content
   */
  store(filename: string, content: string): Promise<void>;

  /**
   * Stores the content in filename made from hashed content within the given directory
   * @param {string} content
   */
  storeWithHash(content: string): Promise<void>;

  /**
   * Returns the content from the filename
   * @param {string} filename
   * @returns {string}
   */
  get(filename: string): Promise<string>;
}

export default class FS implements FSInterface {
  public rootDir: string;

  constructor(rootDir: string) {
    if (!rootDir || rootDir.length < 1 || !fs.existsSync(rootDir)) {
      throw new DirectoryDoesNotExistError(undefined, rootDir);
    }
    this.rootDir = rootDir;
  }

  async store(filename: string, content: string): Promise<void> {
    if (!this.validStringField(filename) || !this.validStringField(content)) {
      throw new InvalidParamsError();
    }

    const path = join(this.rootDir, filename);
    if (fs.existsSync(path)) {
      throw new FileAlreadyExistsError(undefined, path);
    }

    try {
      await fsPromises.writeFile(path, content, 'utf-8');
      console.log('File written successfully');
    } catch (error) {
      console.error('Error writing the file:', error);
    }
  }

  async storeWithHash(content: string): Promise<void> {
    if (!this.validStringField(content)) {
      throw new InvalidParamsError();
    }

    const fileName = crypto.createHash('md5').update(content).digest('hex');
    const path = join(this.rootDir, fileName);

    if (fs.existsSync(path)) {
      throw new FileAlreadyExistsError(undefined, path);
    }

    try {
      await fsPromises.writeFile(path, content, 'utf-8');
      console.log('File written successfully');
    } catch (error) {
      console.error('Error writing the file:', error);
    }
  }

  async get(filename: string): Promise<string> {
    if (!this.validStringField(filename)) {
      throw new InvalidParamsError(undefined, filename);
    }

    const path = join(this.rootDir, filename);
    if (!fs.existsSync(path)) {
      throw new MissingFileError(undefined, path);
    }

    return await fs.promises.readFile(path, { encoding: 'utf-8' });
  }

  private validStringField(content: string): boolean {
    return !!content && typeof content === 'string' && content.length > 0;
  }
}
