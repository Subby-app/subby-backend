import bcrypt from 'bcrypt';

export class Encryption {
  static async encryptText(text: string, salt: string | number = 12): Promise<string> {
    return bcrypt.hash(text, salt);
  }

  static isEncrypted(text: string): boolean {
    return bcrypt.getRounds(text) > 0;
  }

  static async compare(hash: string, text: string): Promise<boolean> {
    return await bcrypt.compare(text, hash);
  }
}
