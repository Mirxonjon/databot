import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Get,
  Query,
  UseInterceptors,
  UploadedFile,
  Headers,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUsersDto, LoginAdminDto } from './dto/create-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { googleCloud } from 'src/utils/google_cloud';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  readonly #_service: UsersService;
  constructor(service: UsersService) {
    this.#_service = service;
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: [
        'id',
        'name',
        'was_born',
        'phone',
        'address',
        'student',
        'lang_ru',
        'lang_uz',
        'lang_en',
        "experience",
        "image"
      ],
      properties: {
        id: {
          type: 'string',
          default: 'acds',
        },
        name: {
          type: 'string',
          default: 'Развитие технологий',
        },
        was_born: {
          type: 'string',
          default: '9-10',
        },
        phone: {
          type: "Yaxshi mashg'ulot",
          default: 'uuid',
        },
        student: {
          type: 'string',
          default: 'Хорошее обучение',
        },
        lang_ru: {
          type: 'string',
          default: 'Хорошее обучение',
        },
        lang_uz: {
          type: 'string',
          default: 'Хорошее обучение',
        },
        lang_en: {
          type: 'string',
          default: 'Хорошее обучение',
        },
        address: {
          type: 'string',
          default: 'Хорошее обучение',
        },
        experience: {
          type: 'string',
          default: 'Хорошее обучение',
        },
        image: {
          type: 'string',
          default: 'Хорошее обучение',
        },
      },
    },
  })
  async create(@Body() createusersdto: CreateUsersDto) {
    
    return await this.#_service.create(createusersdto);
  }

  
  @Get('all')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findAll(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.#_service.findAll(pageNumber, pageSize);
  }

  @Get('/findByFilter/users?')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findByFilter(
    @Query('name') name: string,
    @Query('phone') phone: string,
    @Query('status') status: string,
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.#_service.findbyFilter(name, phone, status ,pageNumber ,pageSize);
  }


  @Get('olddata')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findOld(
  ) {
    return await this.#_service.findOll();
  }
}
