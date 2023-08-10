import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable() 
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async getBrand () {
    const brand = await this.prisma.brand.findMany();
    return brand;
  }
}