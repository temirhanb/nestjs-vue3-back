import {ApiProperty} from "@nestjs/swagger";

export class SingUpBodyDto {
  @ApiProperty({
    example: "your@mail.com"
  })
  email: string;

  @ApiProperty(
    {
      example: "qwerty"
    }
  )
  password: string;
}

export class SingInBodyDto {
  @ApiProperty({
    example: "your@mail.com"
  })
  email: string;

  @ApiProperty(
    {
      example: "qwerty"
    }
  )
  password: string;
}

export class GetSessionInfoDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  "iat": number;

  @ApiProperty()
  "exp": number;
}