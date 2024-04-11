import { Storage } from '@google-cloud/storage';
import { bucketName, storageConfig } from '@/config/cloud-storage.config';
import logger from '@/utils/logger.utils';

const storage = new Storage(storageConfig);

export class ImageUploadService {
  static async uploadImages(
    files: Express.Multer.File[],
  ): Promise<{ message: string; data: string[] }> {
    try {
      const uploadedUrls = await Promise.all(
        files.map(async (file) => {
          const destFileName = `${file.originalname}_${Date.now()}`;
          const destination = `images/${destFileName}`;

          // Save the file buffer to the specified destination in the bucket
          try {
            await storage
              .bucket(bucketName)
              .file(destination)
              .save(file.buffer, {
                metadata: {
                  contentType: file.mimetype,
                  // Set ACL to public-read for images
                },
              });

            return `https://storage.googleapis.com/${bucketName}/${destination}`;
          } catch (error) {
            logger.error('Error uploading file:', error);
            return null;
          }
        }),
      );

      // Filter out null values (failed uploads) from the uploadedUrls array
      const successfulUploads = uploadedUrls.filter((url) => url !== null) as string[];

      return {
        message: 'Files uploaded successfully',
        data: successfulUploads,
      };
    } catch (error) {
      logger.error('Error uploading files:', error);
      throw new Error('Failed to upload files');
    }
  }
}
