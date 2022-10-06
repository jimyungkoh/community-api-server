import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  readonly content: string;

  @IsString()
  @Matches(/^(?=.*\d).{6,}$/, {
    message:
      'password must be longer than 6 characters and contain at least 1 number',
  })
  password: string;
}
