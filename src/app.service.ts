import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { generateAccessToken, generateRefreshToken } from './service/generate-token';

// const stories = [
//   {
//     title: 'Ethan',
//     link: 'https://storage.yandexcloud.net/evently-photo/02fad1daacc4587e4d89fd3dc173855b.jpg'
//   },
//   {
//     title: 'Amelia',
//     link: 'https://storage.yandexcloud.net/evently-photo/2e717f316b3f1346bc0c55608da6fcc0.jpg'
//   },
//   {
//     title: 'Landon',
//     link: 'https://storage.yandexcloud.net/evently-photo/427eef7f1b4a05a42f587858e8eda1d5.jpg'
//   },
//   {
//     title: 'Harper',
//     link: 'https://storage.yandexcloud.net/evently-photo/830798b856a878838ae22ae7fa5e6fd3.jpg'
//   },
//   {
//     title: 'Nolan',
//     link: 'https://storage.yandexcloud.net/evently-photo/c2c69767ab01f426298937fb2de1ca25.jpg'
//   },
//   {
//     title: 'Isla',
//     link: 'https://storage.yandexcloud.net/evently-photo/eb2caaabcbd409cc1f04b30db517b663.jpg'
//   },
// ]

const posts = [
  {
    link_photo: 'https://storage.yandexcloud.net/evently-photo/39240893df8ce4a6901b3e3ec0b67f42.jpg',
    link_avatar: 'https://storage.yandexcloud.net/evently-photo/f4e2af9c5c6c133c40cbba8518bfd2a3.jpg',
    user_name: 'Liam Harrison',
    title: "Life is an incredible journey filled with unexpected twists and turns. It's when we embrace the unknown and venture outside our comfort zones that we truly discover our potential. Each step into the unfamiliar opens up a world of possibilities, leading us down new and exciting paths. Don't be afraid to take that leap of faith and see where it takes you. You never know, the greatest adventures of your life may be waiting just beyond the horizon"
  },
  {
    link_photo: 'https://storage.yandexcloud.net/evently-photo/591db6021471d97919350e9c0af1b98f.jpg',
    link_avatar: 'https://storage.yandexcloud.net/evently-photo/fedb78fee47a79b4a3a01b95e1531202.jpg',
    user_name: 'Ava Bennett',
    title: "In the hustle and bustle of our busy lives, it's easy to overlook the simple joys that surround us every day. We get so caught up in chasing success and ticking off tasks on our to-do lists that we forget to slow down and appreciate the beauty of the present moment. Take a moment to pause, breathe in the fresh air, and marvel at the wonders around you. Whether it's the vibrant colors of a blooming flower or the soothing sound of raindrops on a window pane, these small moments of bliss can bring immense happiness. So, let go of the rush, be fully present, and savor the magic of the ordinary."
  },
  {
    link_photo: 'https://storage.yandexcloud.net/evently-photo/6f9249a81e1740681d95843b9c2fb955.jpg',
    link_avatar: 'https://storage.yandexcloud.net/evently-photo/fc9f7446bab8b6fa76b543051349eefe.jpg',
    user_name: 'Ethan Sullivan',
    title: "Life throws us curveballs and presents us with challenges that test our strength and resilience. It's during these moments of adversity that we have a choice - to shrink back and play it safe, or to rise up and face them head-on. Don't be afraid to take risks, push beyond your limits, and explore the depths of your potential. Sometimes, it's through the toughest trials that we discover our true capabilities and find the courage to unleash our hidden talents. Embrace the unknown, embrace the struggle, and embrace the growth that comes with it. You have within you the power to overcome anything that comes your way and emerge stronger than ever before."
  }
]
@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  // async getHello() {
  //   const arr = await this.prisma.story.createMany({
  //     data: stories
  //   })
  //   return arr
  // }

  async setPosts() {
    const arr = await this.prisma.post.createMany({
      data: posts
    })
    return arr
  }

  async checkNumber(number) {    
    const numb = await this.prisma.user.findUnique({
      where: {
        phone: `+${number}`
      }
    })    

    if (numb) {
      return true;
    } else {
      return false;
    }
  }

  async signin(id) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id.user_id
      }
    })
    if (user) {
      const refreshToken = generateRefreshToken({id: user.id});
      const accessToken = generateAccessToken({name: user.name})
      await this.prisma.token.upsert({
        where: {
          user_id: user.id
        },
        update: {
          refresh_token: refreshToken
        },
        create: {
          user_id: user.id,
          refresh_token: refreshToken
        }
      })
      const id = user.id

      return {id, accessToken};
    } else {
      throw new Error();
    }
  }
}
