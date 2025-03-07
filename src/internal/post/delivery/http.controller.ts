import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Query,
  Headers,
} from '@nestjs/common';
import { ErrorInvalidPostBody, PostDomain, PostInterop } from 'src/domain/post.domain';
import any = jasmine.any;

@Controller('v1/post')
export class HttpController {
  constructor(@Inject('PostInterop') private interop: PostInterop) {}
  @Get()
  async getPost(@Headers() headers:any,@Query('id') id: string) {
    let token = headers['authorization'];
    try {
      return await this.interop.getDetail(id, token);
    } catch (e) {
      throw e;
    }
  }
  @Get()
  async getPostById(@Headers() headers: any, @Query('postId') postId: string) {
    let token = headers['authorization'];
    try {
      return await this.interop.getPostById(postId, token);
    } catch (e) {
      throw e;
    }
  }
  @Get('all')
  async getAllPost(@Headers() headers:any) {
    let token = headers['authorization'];
    try {
      return await this.interop.getAllPost(token);
    } catch (e) {
      throw e;
    }
  }

  @Get('mention')
  async getMention(
    @Headers() headers: any,
    @Query('mention') mention: string,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    let token = headers['authorization'];
    try {
      return await this.interop.getByMentionId(mention, token, page, size);
    } catch (e) {
      throw e;
    }
  }

  @Get('mine')
  async getMine(
    @Headers() headers: any,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    let token = headers['authorization'];
    try {
      return await this.interop.getMine(token, page, size);
    } catch (e) {
      throw e;
    }
  }

  @Get('user')
  async getPostsByUid(
    @Headers() headers: any,
    @Query('creatorId') creatorId: string,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    let token = headers['authorization'];
    try {
      return await this.interop.getAllByUid(token, creatorId, page, size);
    } catch (e) {
      throw e;
    }
  }

  @Get('newfeeds')
  async getPostsByCateId(
    @Headers() headers: any,
    @Query('cateId') cateId: string,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    let token = headers['authorization'];
    try {
      return await this.interop.getByCateId(cateId, token, page, size);
    } catch (e) {
      throw e;
    }
  }

  @Get('share')
  async getSharedPost(
    @Headers() headers: any,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    let token = headers['authorization'];
    try {
      return await this.interop.getShare( token, page, size);
    } catch (e) {
      throw e;
    }
  }

  @Post()
  async createPost(@Headers() headers: any, @Body() post: PostDomain) {
    let token = headers['authorization'];
    if (!post || Object.keys(post).length === 0) {
      throw ErrorInvalidPostBody;
    }
    try {
      return await this.interop.create(post, token);
    } catch (e) {
      throw e;
    }
  }

  @Put()
  async updatePost(@Headers() headers: any, @Body() post: PostDomain) {
    let token = headers['authorization'];
    if (!post || Object.keys(post).length === 0) {
      throw ErrorInvalidPostBody;
    }
    try {
      return await this.interop.update(post, token);
    } catch (e) {
      throw e;
    }
  }

  @Delete()
  async deletePost(@Headers() headers: any, @Query('id') id: string) {
    let token = headers['authorization'];
    try {
      return await this.interop.delete(id, token);
    } catch (e) {
      throw e;
    }
  }
}
