import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MaxLength(20)
  readonly title: string;

  @IsString()
  @MaxLength(200)
  readonly content: string;

  @IsString()
  @Matches(/^(?=.*\d).{6,}$/, {
    message:
      'password must be longer than 6 characters and contain at least 1 number',
  })
  password: string;
}
