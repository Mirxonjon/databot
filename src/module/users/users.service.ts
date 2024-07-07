import { UsersEntity } from 'src/entities/users.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUsersDto, LoginAdminDto } from './dto/create-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';
import { Like } from 'typeorm';
import { AdminEntity } from 'src/entities/admin.entity';
import * as jwt from 'jsonwebtoken';

import { googleCloud } from 'src/utils/google_cloud';
import axios, { Axios } from 'axios';
import { ImageDictationEntity } from 'src/entities/images.entity';

@Injectable()
export class UsersService {
  async create(body: CreateUsersDto) {
    console.log(body.image);
    
    const { data } = await axios.get(`${body.image}`, {
      responseType: 'arraybuffer',
    });
    const Imagelink = googleCloud({
      buffer: data,
      originalname: `${body.name}.JPG`,
    });

    const resume = await axios.get(body.resume, {
      responseType: 'arraybuffer',
    });
    console.log(body.image ,'li', Imagelink , 'pdf ' , body.resume);

    const resumeLink = googleCloud({
      buffer: resume.data,
      originalname: `${body.name}.pdf`,
    });
    await UsersEntity.createQueryBuilder()
      .insert()
      .into(UsersEntity)
      .values({
        id_tg: body.id,
        name: body.name,
        date_was_born: body.was_born,
        phone: body.phone.split(' ').join(''),
        address: body.address,
        student: body.student,
        lang_ru: body.lang_ru,
        lang_uz: body.lang_uz,
        lang_en: body.lang_en,
        comp: body.comp,
        experience: body.experience,
        image: `https://storage.googleapis.com/telecom-storege_pic/${Imagelink}`,
        resumePdf: `https://storage.googleapis.com/telecom-storege_pic/${resumeLink}`,
      })
      .execute()
      .catch((e) => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async login(body: LoginAdminDto) {
    const findAdmin: AdminEntity[] = await AdminEntity.find({
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
      role: findAdmin[0].role,
      status: HttpStatus.OK,
    };
  }

  async findAll(pageNumber = 1, pageSize = 10) {
    const offset = (pageNumber - 1) * pageSize;

    const [results, total] = await UsersEntity.findAndCount({
      order: {
        create_data: 'DESC',
      },
      relations: {
        images: true,
      },
      skip: offset,
      take: pageSize,
    });

    const totalPages = Math.ceil(total / pageSize);

    return {
      results,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        pageSize,
        totalItems: total,
      },
    };
  }

  async findbyFilter(
    name: string,
    phone: string,
    status: string,
    pageNumber = 1,
    pageSize = 10,
  ) {
    const offset = (pageNumber - 1) * pageSize;

    const [results, total] = await UsersEntity.findAndCount({
      where: {
        name: name == 'null' ? null : Like(`%${name.toUpperCase()}%`),
        phone: phone == 'null' ? null : Like(`%${phone}%`),
        status: status == 'null' ? null : status == 'all' ? null : status,
      },
      order: {
        create_data: 'DESC',
      },
      relations: {
        images: true,
      },
      skip: offset,
      take: pageSize,
    }).catch(() => {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    });

    const totalPages = Math.ceil(total / pageSize);

    return {
      results,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        pageSize,
        totalItems: total,
      },
    };
  }
}
