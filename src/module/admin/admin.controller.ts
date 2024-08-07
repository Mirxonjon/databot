import { LoginAdminDto } from './../users/dto/create-user.dto';
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
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { addCommentDto, addDictationDto } from './dto/create-admin.dto';
import { UpdateCommentDto, UpdateUsersDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { googleCloud } from 'src/utils/google_cloud';

@Controller('admin')
@ApiTags('Admin')
export class adminController {
  readonly #_service: AdminService;
  constructor(service: AdminService) {
    this.#_service = service;
  }

  @Post('addDictation')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file', 'user_id', 'name_file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        user_id: {
          type: 'string',
          default: 'safdsgetnisofh898r342rg76dgbvq3udty789hd7321fdg6',
        },
        name_file: {
          type: 'string',
          default: 'name',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'admin_token',
    description: 'Admin token',
    required: true,
  })
  @UseInterceptors(FileInterceptor('file'))
  async createImageDictation(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: addDictationDto,
    @Headers() header: any,
  ) {
    console.log(file);

    if (file) {
      const link: string = await googleCloud(file);
      return await this.#_service.createImageDictation(body, link);
    } else {
      return 'image not sent';
    }
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

  @Post('addComment')
  // @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['comment', 'user_id'],
      properties: {
        user_id: {
          type: 'string',
          default: 'sadgfruiwht9483trhohf89wytfy43yrt84324tr4933432',
        },
        comment: {
          type: 'string',
          default: 'yaxshi komment',
        },
      },
    },
  })
  async AddComment(@Body() AddCommentDto: addCommentDto) {
    return await this.#_service.addComment(AddCommentDto);
  }

  @Patch('/updateComment/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        comment: {
          type: 'string',
          default: 'yaxshi komment',
        },
      },
    },
  })
  async updateComment(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<void> {
    return this.#_service.updateComment(id, updateCommentDto);
  }

  @Patch('/updateClearComment/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateClearComment(@Param('id') id: string): Promise<void> {
    return this.#_service.updateClearComment(id);
  }

  @Patch('/updateStatus/:id')
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

  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.#_service.remove(id);
  }
}
