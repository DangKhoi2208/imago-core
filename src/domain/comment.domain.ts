import { Body } from '@nestjs/common';
import {HttpException} from '@nestjs/common';

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
}

export interface CommentRepository {
  createComment(comment: Comment): Promise<boolean>;
  updateComment(id:string,comment: Comment): Promise<boolean>;
  deleteComment(id: string, comment: Comment): Promise<boolean>;
  getCommentById(id: string): Promise<Comment>;
  getComments(): Promise<Comment[]>;
  getCommentsByPostId(postId: string): Promise<Comment[]>;
}

export interface CommentUseCase {
  createComment(comment: Comment): Promise<boolean>;
  updateComment( id: string,comment: Comment): Promise<boolean>;
  deleteComment(id: string, comment: Comment): Promise<boolean>;
  getCommentById(id: string): Promise<Comment>;
  getComments(): Promise<Comment[]>;
  getCommentsByPostId(postId: string): Promise<Comment[]>;
}

export interface CommentInterop {
  createComment(token: string,comment: Comment): any;
  updateComment(token: string,id: string,comment: Comment): any;
  deleteComment(token: string,id: string, comment: Comment): any;
  getCommentById(token: string,id: string): Promise<Comment>;
  getComments(token: string): Promise<Comment[]>;
  getCommentsByPostId(token: string,postId: string): Promise<Comment[]>;
}
export const ErrorCommentContent: HttpException = new HttpException('Comment content cannot be empty',
400,
);
export const ErrorCommentNotDeleted: HttpException = new HttpException('Comment not found to delete',
400,
);
export const ErrorCommentAlreadyExits: HttpException = new HttpException('Comment Already Created',
400,
);
export const ErrorCommentNotString: HttpException = new HttpException('Comment id must be a string',
400,
);
export const ErrorCommentAuthorId: HttpException = new HttpException('Comment authorId cannot be empty',
400,
);
export const ErrorCommentPostId: HttpException = new HttpException('This post dont have any comment',
400,
);
export const ErrorCommentNotUpdatedByIdNotTheSame: HttpException = new HttpException('Comment not updated by Id not the same',
400,
);
export const ErrorCommentNotfound: HttpException = new HttpException('Comment not found',
400,
);
export const ErrorCommentNotCreated: HttpException = new HttpException('Comment not created',
400,
);


