import bcrypt from 'bcryptjs';

export class Encryption {
  static encryptText(text: string, salt: string | number = 12): string {
    if (!text || typeof text !== 'string' || !['string', 'number'].includes(typeof salt)) {
      throw new Error('Missing one or more required arguments or invalid argument types');
    }

    return bcrypt.hashSync(text, salt);
  }

  static isEncrypted(text: string): boolean {
    if (!text || typeof text !== 'string') {
      throw new Error('Missing one or more required arguments or invalid argument types');
    }

    return bcrypt.getRounds(text) > 0;
  }

  static compare(hash: string, text: string): boolean {
    if (!hash || !text || typeof text !== 'string' || typeof hash !== 'string') {
      throw new Error('Missing one or more required arguments or invalid argument types');
    }

    return bcrypt.compareSync(text, hash);
  }
}
