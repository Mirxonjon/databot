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
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUsersDto, LoginAdminDto } from './dto/create-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';

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
      },
    },
  })
  async create(@Body() createusersdto: CreateUsersDto) {
    return await this.#_service.create(createusersdto);
  }

  @Post('login')
  // @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'password'],
      properties: {
        name: {
          type: 'string',
          default: 'Eshmat',
        },
        password: {
          type: 'string',
          default: '123456789',
        },
      },
    },
  })
  async login(@Body() loginadmindto: LoginAdminDto) {
    return await this.#_service.login(loginadmindto);
  }
  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          default: 'Texni',
        },
      },
    },
  })
  async update(@Param('id') id: string, @Body() updateuserdto: UpdateUsersDto) {
    return this.#_service.update(id, updateuserdto);
  }

  @Get('all')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findAll() {
    return await this.#_service.findAll();
  }

  @Get('/findByFilter/users?')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findByFilter(
    @Query('name') name: string,
    @Query('phone') phone: string,
    @Query('status') status: string,
  ) {
    return await this.#_service.findbyFilter(name, phone, status);
  }
}
