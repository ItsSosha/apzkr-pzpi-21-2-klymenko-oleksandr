import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  main: string;

  @ApiProperty()
  coverFile: Express.Multer.File;

  @ApiProperty()
  tags: string[];
}
