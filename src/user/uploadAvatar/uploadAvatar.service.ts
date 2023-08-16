import { Injectable } from '@nestjs/common';

import * as AWS from 'aws-sdk';

import { Avatar } from './interface';
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) { }

  async uploadFile(file, id: number): Promise<void | Avatar> {
    try {
      const s3 = new AWS.S3({
        accessKeyId: 'YCAJE3hsaFeXWP4qWEJaz8_8E',
        secretAccessKey: 'YCP5fk1yvII2FXB5zO1JlieKBI9mKK4-Q9x19E-9',
        endpoint: 'https://storage.yandexcloud.net',
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
      });

      const bucketName = 'evently-photo';
      const fileName = `${Date.now()}_${file.originalname}`;

      const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const response = await s3.upload(params).promise();

      const fileUrl = response.Location;
      await this.prisma.user.update({
        where: {
          id: Number(id)
        },
        data: {
          link_avatar: fileUrl
        },
      })
      return { link_avatar: fileUrl };
    } catch (e) {
      return console.log(e);
    }
  }
}
