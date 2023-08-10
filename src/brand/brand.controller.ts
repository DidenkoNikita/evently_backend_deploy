import { Controller, Post, Res } from "@nestjs/common";
import { BrandService } from "./brand.service";
import { Response } from "express";

@Controller('/brand') 
export class BrandController {
  constructor(private readonly brandService: BrandService) {}
  
  @Post()
  async getBrand(@Res() res: Response) {
    try {
      const brand = await this.brandService.getBrand();
      res.status(200).json(brand);
    } catch(e) {
      return console.log(e);
    }
  }
}