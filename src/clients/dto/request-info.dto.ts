import {IsEmail, IsString} from 'class-validator'

export class RequestInfoDto {
  @IsEmail()
  email: string

  @IsString()
  first_name: string

  @IsString()
  last_name: string
}
