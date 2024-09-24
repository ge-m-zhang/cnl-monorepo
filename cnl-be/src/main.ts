import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as session from 'express-session';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');  // Set global prefix for all routes

  // optional?
    // Configure session management
    app.use(
      session({
        secret: 'session-secret',  // Use environment variable in production
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24,  // 1 day session duration
        },
      }),
    );
    
    app.enableCors({
      //! replace this with an env varialbe
      origin: 'http://localhost:3000',  
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Allowed HTTP methods
      credentials: true,  // Enable credentials (cookies, sessions)
      allowedHeaders:'Content-Type, Authorization, X-PubDash-ID, Set-Cookie',  // Allow specific headers
      optionsSuccessStatus: 200,  // For legacy browsers support
  
      preflightContinue: false,
    });

    await app.listen(4000);
}
bootstrap();
