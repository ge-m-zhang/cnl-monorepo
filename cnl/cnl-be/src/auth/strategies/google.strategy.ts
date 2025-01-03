import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigurationService } from 'src/configuration/configuration.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger(GoogleStrategy.name);

  constructor(configService: ConfigurationService) {
    super({
      clientID: configService.getGoogleConfig().clientId,
      clientSecret: configService.getGoogleConfig().clientSecret,
      // need to be added to Authorized redirect URIs in Google Cloud Console
      // APIs & Services > Crendentials > Web client 1 > Authorized redirect URIs
      callbackURL: configService.getGoogleConfig().callbackUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: responseProfile,
    done: (error: unknown, user?: unknown) => void,
  ) {
    const { name, emails, photos } = profile;
    //Logger.log('profile***', JSON.stringify(profile));
    const user = {
      email: emails[0]?.value,
      firstName: name?.givenName,
      lastName: name?.familyName,
      picture: photos[0]?.value,
      accessToken,
    };
    done(null, user); // Ensure the user is passed to `done`
  }
}

//temp
export type responseProfile = {
  emails: { value: string; verified: boolean }[];
  name: { familyName: string; givenName: string };
  photos: { value: string }[];
};

/*
 [{
"id":"111649612817649230042",
 "displayName":"Melody Zhang",
 "name":{"familyName":"Zhang","givenName":"Melody"},
 "emails":[{"value":"melodyzhang0701@gmail.com","verified":true}],
 "photos":[{"value":"https://lh3.googleusercontent.com/a/ACg8ocJNZgIx13_5g2qrQVDjb7FrXhiwsuXcpl3C01b_GvLovyMJN_WC=s96-c"}],
  "provider":"google","_raw":"{\n  \"sub\": \"111649612817649230042\",\n  \"name\": \"Melody Zhang\",\n  \"given_name\": \"Melody\",\n  \"family_name\": \"Zhang\",\n  \"picture\": \"https://lh3.googleusercontent.com/a/ACg8ocJNZgIx13_5g2qrQVDjb7FrXhiwsuXcpl3C01b_GvLovyMJN_WC\\u003ds96-c\",\n  \"email\": \"melodyzhang0701@gmail.com\",\n  \"email_verified\": true\n}",
  "_json":{"sub":"111649612817649230042","name":"Melody Zhang","given_name":"Melody","family_name":"Zhang","picture":"https://lh3.googleusercontent.com/a/ACg8ocJNZgIx13_5g2qrQVDjb7FrXhiwsuXcpl3C01b_GvLovyMJN_WC=s96-c","email":"melodyzhang0701@gmail.com","email_verified":true}}] 
  profile***
 */
