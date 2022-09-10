import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';
import { PostDto } from './post.dto';

export class CreatePostDto extends PostDto {
  @IsString()
  @Matches(/^(?=.*\d).{6,}$/, {
    message:
      'password must be longer than 6 characters and contain at least 1 number',
  })
  password: string;
}
