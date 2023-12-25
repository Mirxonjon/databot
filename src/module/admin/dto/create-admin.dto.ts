import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class addCommentDto {
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}

export class addDictationDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  name_file: string;
}
