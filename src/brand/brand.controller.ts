import { Controller, Post, Res } from "@nestjs/common";

import { Response } from "express";

import { Brand } from "./interface";
import { BrandService } from "./brand.service";

@Controller('/brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Post()
  async getBrand(@Res() res: Response): Promise<void> {
    try {
      const brand: Brand[] | void = await this.brandService.getBrand();
      res.status(200).json(brand);
    } catch (e) {
      return console.log(e);
    }
  }
}