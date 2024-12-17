import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { AWSModule } from 'src/aws/aws.module';

@Module({
  imports: [AWSModule],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
