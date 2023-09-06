import { IsString ,IsNotEmpty ,MaxLength } from "class-validator";

export class CreateUsersDto {
    @IsString()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    was_born : string
    
    @IsString()
    @IsNotEmpty()
    phone: string

    @IsString()
    @IsNotEmpty()
    address: string

    @IsString()
    @IsNotEmpty()
    student: boolean

    @IsString()
    @IsNotEmpty()
    lang_ru: string

    @IsString()
    @IsNotEmpty()
    lang_uz: string

    @IsString()
    @IsNotEmpty()
    lang_en: string

    @IsString()
    @IsNotEmpty()
    comp: string
}

export class LoginAdminDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    password: string
}