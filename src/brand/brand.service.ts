import { Injectable } from "@nestjs/common";

import { Brand } from "./interface";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) { }

  async getBrand(): Promise<void | Brand[]> {
    try {
      const brand: Brand[] = await this.prisma.brand.findMany();
      return brand;
    } catch (e) {
      return console.log(e);
    }
  }
}