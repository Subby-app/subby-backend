import 'dotenv/config';
import { StorageOptions } from '@google-cloud/storage';

export const storageConfig: StorageOptions = {
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.KEY_FILE_NAME,
};

export const bucketName = process.env.BUCKET_NAME || '';
