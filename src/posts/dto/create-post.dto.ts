import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  readonly title: string;

  @IsString()
  @MinLength(2)
  @MaxLength(200)
  readonly content: string;

  @IsString()
  @Matches(/^(?=.*\d).{6,}$/, {
    message:
      'password must be longer than 6 characters and contain at least 1 number',
  })
  password: string;
}
