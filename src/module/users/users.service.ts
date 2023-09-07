import { UsersEntity } from 'src/entities/users.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUsersDto, LoginAdminDto } from './dto/create-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';
import { Like } from 'typeorm';
import { AdminEntity } from 'src/entities/admin.entity';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UsersService {
  async create(body: CreateUsersDto) {
    await UsersEntity.createQueryBuilder()
      .insert()
      .into(UsersEntity)
      .values({
        id_tg: body.id,
        name: body.name,
        date_was_born: body.was_born,
        phone: body.phone,
        address: body.address,
        student: body.student,
        lang_ru: body.lang_ru,
        lang_uz: body.lang_uz,
        lang_en: body.lang_en,
        comp: body.comp,
        skills: body.skills,
      })
      .execute()
      .catch((e) => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async login(body: LoginAdminDto) {
    console.log(body);

    const findAdmin = await AdminEntity.find({
      where: {
        name: body.name,
        password: body.password,
      },
    }).catch((e) => {
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST);
    });
    if (!findAdmin.length) {
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST);
    }

    const token = jwt.sign({ ...findAdmin }, 'dsfagds');

    return {
      token: token,
      status: HttpStatus.OK,
    };
  }
  async update(id: string, body: UpdateUsersDto) {
    const findUser = await UsersEntity.findOne({
      where: {
        id: id,
      },
    }).catch(() => {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    });

    if (findUser) {
      await UsersEntity.createQueryBuilder()
        .update(UsersEntity)
        .set({
          status: body.status || findUser.status,
        })
        .where({ id })
        .execute()
        .catch(() => {
          throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        });
    }
  }

  async findAll() {
    const allUsers = await UsersEntity.find({
      order: {
        create_data: 'DESC',
      },
    }).catch(() => {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    });

    return allUsers;
  }

  async findbyFilter(name: string, phone: string, status: string) {
    const allUsers = await UsersEntity.find({
      where: {
        name: name == 'null' ? null : Like(`%${name.toUpperCase()}%`),
        phone: phone == 'null' ? null : Like(`%${phone}%`),
        status: status == 'null' ? null : status,
      },
      order: {
        create_data: 'DESC',
      },
    }).catch(() => {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    });

    return allUsers;
  }
}
