import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  readonly content: string;
}
