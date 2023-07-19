import { Controller, Param, Put, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { UploadService } from "./uploadAvatar.service";

@Controller("/upload_avatar")
export class UploadAvatarController {
  constructor(private uploadService: UploadService) {}

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@UploadedFile() file, @Param('id') id: number, @Res() res: Response) {
    try {
      const fileUrl = await this.uploadService.uploadFile(file, id);
      res.status(200).json(fileUrl)
      return { fileUrl };
    } catch (error) {
      return { error: 'Не удалось загрузить аватар.' };
    }
  }
}