import { Module } from '@nestjs/common';
import { HttpController } from './delivery/http.controller';
import { AuthModule } from '../auth/auth.module';
import { BaseUseCaseService } from './usecase/base/base.service';
import { BaseRepositoryService } from './repository/base/base.service';
import { BaseInteropService } from './interop/base/base.service';

@Module({
  providers: [
    { provide: 'PostRepository', useClass: BaseRepositoryService },
    { provide: 'PostUseCase', useClass: BaseUseCaseService },
    { provide: 'PostInterop', useClass: BaseInteropService },

  ],
  controllers: [HttpController],
  imports:[AuthModule],
  exports: ['PostRepository', 'PostUseCase', 'PostInterop'],
})
export class PostModule {}
