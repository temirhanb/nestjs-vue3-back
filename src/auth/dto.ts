import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty} from "class-validator";

export class SingUpBodyDto {
  @ApiProperty({
    example: "your@mail.com"
  })
  @IsEmail()
  email: string;

  @ApiProperty(
    {
      example: "qwerty"
    }
  )
  @IsNotEmpty()
  password: string;
}

export class SingInBodyDto {
  @ApiProperty({
    example: "your@mail.com"
  })
  @IsEmail()
  email: string;

  @ApiProperty(
    {
      example: "qwerty"
    }
  )
  @IsNotEmpty()
  password: string;
}

export class GetSessionInfoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  "iat": number;

  @ApiProperty()
  "exp": number;
}