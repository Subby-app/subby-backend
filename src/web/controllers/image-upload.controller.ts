import { ImageUploadService } from '@/logic/services/image-upload.service';
import { BaseHttpResponse } from '@/utils/base-Http-response.utils';
import { HttpStatus } from '@/utils/exceptions';
import { Request, Response } from 'express';

export class ImageUploadController {
  static async uploadImages(req: Request, res: Response) {
    const { message, data } = await ImageUploadService.uploadImages(
      req.files as Express.Multer.File[],
    );

    const result = BaseHttpResponse.success(message, data);
    res.status(HttpStatus.OK).json(result);
  }
}
