import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
   app.enableCors({
    //! replace this with an env varialbe
    origin: 'http://localhost:3000',  
    credentials: true, 
  });

  
  await app.listen(4000);
}
bootstrap();
