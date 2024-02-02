import bcrypt from 'bcryptjs';

export class Encryption {
  static encryptText(text: string, salt: string | number = 12): string {
    return bcrypt.hashSync(text, salt);
  }

  static isEncrypted(text: string): boolean {
    return bcrypt.getRounds(text) > 0;
  }

  static compare(hash: string, text: string): boolean {
    return bcrypt.compareSync(text, hash);
  }
}
