import { Storage } from '@google-cloud/storage';
import { bucketName, storageConfig } from '../../config/cloud-storage.config';

export class ImageUploadService {
  static storage = new Storage(storageConfig);

  static async uploadImages(
    files: Express.Multer.File[],
  ): Promise<{ message: string; data: string[] }> {
    const uploadedUrls: string[] = [];

    const bucket = this.storage.bucket(bucketName);

    await Promise.all(
      files.map(async (file) => {
        const write = bucket.file(file.originalname);
        const writeStream = write.createWriteStream();

        await new Promise<void>((resolve, reject) => {
          writeStream.on('finish', () => {
            const imageUrl = `https://subby-images.com/${bucketName}/${file.originalname}`;
            uploadedUrls.push(imageUrl);
            resolve();
          });
          writeStream.on('error', (err) => {
            reject(err);
          });
          writeStream.end(file.buffer);
        });
      }),
    );

    return {
      message: 'Image upload successful',
      data: uploadedUrls,
    };
  }
}
