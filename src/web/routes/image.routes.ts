import { Router } from 'express';
import { ImageUploadController } from '../controllers/image-upload';
import { multer } from '@/utils/multer';

export const imageRouter = Router();

imageRouter.post('/upload', multer.array('imgfile'), ImageUploadController.uploadImages);
