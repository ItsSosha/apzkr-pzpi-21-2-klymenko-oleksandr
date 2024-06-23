import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { AuthGuard, UserId } from 'src/auth';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { Admin } from 'src/auth/decorators/admin.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard, AdminGuard)
@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Admin()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('coverFile', {
      storage: diskStorage({
        destination: './uploads/cover',
        filename: (_, file, cb) => {
          const fileExtension = file.originalname.split('.').pop();
          const filename = `${uuid()}.${fileExtension}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @Post()
  create(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile() file: Express.Multer.File,
    @UserId() userId: string,
  ) {
    return this.articleService.create(createArticleDto, file, userId);
  }

  @ApiQuery({
    required: false,
    name: 'query',
  })
  @Get()
  findAll(@Query('query') query: string) {
    return this.articleService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @Admin()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('coverFile', {
      storage: diskStorage({
        destination: './uploads/cover',
        filename: (req, file, cb) => {
          const id = req.params.id;
          const fileExtension = file.originalname.split('.').pop();
          const filename = `${id}.${fileExtension}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.articleService.update(id, updateArticleDto, file);
  }

  @Admin()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}
