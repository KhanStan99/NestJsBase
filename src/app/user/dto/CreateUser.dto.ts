import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  Matches,
  IsMobilePhone,
  IsEmail,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  FirstName: string;

  @ApiPropertyOptional()
  @IsString()
  LastName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsEmail()
  Emailid: string;

  @ApiPropertyOptional()
  @IsString()
  @IsMobilePhone('en-IN', { strictMode: true })
  Mobile: string;

  @ApiPropertyOptional({ example: '31/12/1990' })
  @IsString()
  @Matches(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)
  DOB: string;

  @ApiPropertyOptional()
  @IsString()
  @IsUrl()
  DLImgUrl: string;

  @ApiPropertyOptional()
  @IsString()
  Password: string;
}
