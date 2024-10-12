import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AWSModule } from 'src/aws/aws.module';

@Module({
  imports:[AWSModule], 
  controllers: [UserController],  
  providers: [UserService],       
  exports: [UserService],        
})
export class UserModule {}
