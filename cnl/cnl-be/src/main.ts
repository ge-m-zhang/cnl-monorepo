import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';

import { AppModule } from './app.module';
import { SessionSerializer } from './auth/auth.module';
import { ConfigurationService } from './configuration/configuration.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // Set global prefix for all routes

  const configService = app.get(ConfigurationService);

  // Session middleware configuration
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'default-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true, // Prevent JavaScript from accessing the cookie
        secure: false, // Set to true if running in production with HTTPS
        maxAge: 1000 * 60 * 60 * 24, // Set cookie expiration (1 day)
      },
    }),
  );

  // Passport initialization and session handling
  app.use(passport.initialize());
  app.use(passport.session());

  // Register SessionSerializer with Passport
  const sessionSerializer = app.get(SessionSerializer);

  passport.serializeUser(
    sessionSerializer.serializeUser.bind(sessionSerializer),
  );
  passport.deserializeUser(
    sessionSerializer.deserializeUser.bind(sessionSerializer),
  );

  const { port } = configService.getServerConfig();
  const { host } = configService.getClientConfig(); // FE

  app.enableCors({
    //! replace this with an env varialbe
    origin: host,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Enable credentials (cookies, sessions)
    allowedHeaders: 'Content-Type, Authorization, X-PubDash-ID, Set-Cookie',
    optionsSuccessStatus: 200, // For legacy browsers support

    preflightContinue: false,
  });

  await app.listen(port);
}
bootstrap();
