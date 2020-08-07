import { Module } from '@nestjs/common';
import { ErrorService } from './error.service';

@Module({
  imports: [],
  providers: [ErrorService],
  exports: [ErrorService],
})
export class ErrorModule {}
