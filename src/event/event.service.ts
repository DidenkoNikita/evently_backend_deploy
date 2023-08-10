import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async getEvents() {
    const events = await this.prisma.event.findMany();

    const updatedEvents = await Promise.all(events.map(async (event: any) => {
      const brand = await this.prisma.brand.findUnique({
        where: {
          id: event.brand_id
        },
        select: {
          address: true,
          phone: true,
          name_site: true,
          site_link: true
        }
      })

      event.address = brand.address;
      event.phone = brand.phone;
      event.name_site = brand.name_site;
      event.site_link = brand.site_link;

      return event;
    }))

    return updatedEvents;
  }
}