import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ILike, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly userService: UserService,
  ) {}

  async create(
    createArticleDto: CreateArticleDto,
    file: Express.Multer.File,
    userId: string,
  ) {
    const newArticle = this.articleRepository.create(createArticleDto);
    if (userId) {
      const user = await this.userService.findOne(userId);
      newArticle.author = user;
    }
    newArticle.cover = file.filename;
    newArticle.id = file.filename.split('.').shift();
    return this.articleRepository.save(newArticle);
  }

  findAll(query: string) {
    let qb = this.articleRepository
      .createQueryBuilder('article')
      .innerJoin('article.author', 'author')
      .select([
        'article.id',
        'article.title',
        'article.tags',
        'article.content',
        'article.cover',
        'author.id',
        'author.name',
        'author.surname',
      ]);

    if (query) {
      qb = qb
        .where('article.title ILIKE :query')
        .orWhere('article.tags::text ILIKE :query')
        .setParameter('query', `%${query}%`);
    }

    return qb.getMany();
  }

  async findOne(id: string) {
    const article = await this.articleRepository.findOne({
      where: {
        id,
      },
      select: {
        author: {
          id: true,
          name: true,
          surname: true,
        },
      },
      relations: ['author'],
    });
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found.`);
    }

    return article;
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
    file?: Express.Multer.File,
  ) {
    const article = await this.findOne(id);
    const mergedArticle = this.articleRepository.merge(
      article,
      updateArticleDto,
    );
    if (file) {
      mergedArticle.cover = file.filename;
    }
    return this.articleRepository.save(mergedArticle);
  }

  async remove(id: string) {
    const article = await this.findOne(id);
    await this.articleRepository.remove(article);
  }
}
