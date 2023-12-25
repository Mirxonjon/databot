import { UsersEntity } from 'src/entities/users.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  LoginAdminDto,
  addCommentDto,
  addDictationDto,
} from './dto/create-admin.dto';
import { AdminEntity } from 'src/entities/admin.entity';
import * as jwt from 'jsonwebtoken';
import { ImageDictationEntity } from 'src/entities/images.entity';
import { UpdateCommentDto, UpdateUsersDto } from './dto/update-user.dto';

@Injectable()
export class AdminService {
  async createImageDictation(body: addDictationDto, link: string) {
    const findUser = await UsersEntity.findOne({
      where: {
        id: body.user_id,
      },
    }).catch(() => {
      throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
    });

    if (findUser) {
      await ImageDictationEntity.createQueryBuilder()
        .insert()
        .into(ImageDictationEntity)
        .values({
          user: findUser,
          image_link: `https://storage.googleapis.com/telecom-storege_pic/${link}`,
          name_file: body.name_file,
        })
        .execute()
        .catch(() => {
          throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        });
    }
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
  async addComment(addCommentDto: addCommentDto) {
    const findUser = await UsersEntity.findOneBy({
      id: addCommentDto.user_id,
    }).catch(() => {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    });

    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    await UsersEntity.createQueryBuilder()
      .update(UsersEntity)
      .set({
        Comment: addCommentDto.comment,
      })
      .where({ id: addCommentDto.user_id })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async updateComment(id: string, body: UpdateCommentDto) {
    const findUser = await UsersEntity.findOneBy({ id }).catch(() => {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    });

    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    await UsersEntity.createQueryBuilder()
      .update(UsersEntity)
      .set({
        Comment: body.comment || findUser.Comment,
      })
      .where({ id: findUser.id })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async updateClearComment(id: string) {
    const findUser = await UsersEntity.findOneBy({ id }).catch(() => {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    });

    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    await UsersEntity.createQueryBuilder()
      .update(UsersEntity)
      .set({
        Comment: null,
      })
      .where({ id: findUser.id })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
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
}
