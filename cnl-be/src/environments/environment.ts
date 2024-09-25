export type NodeEnv = 'local' | 'qa' | 'development' | 'production';

export type Environment = ReturnType<typeof environment>;
export type ServerConfig = ReturnType<typeof serverConfig>;
export type ClientConfig = ReturnType<typeof clientConfig>;
export type GoogleAuthConfig = ReturnType<typeof googleConfig>;


const serverConfig = () => ({
    env: process.env.APP_ENV ?? ('local' as NodeEnv),
    isTestMode: process.env.NODE_ENV === 'test',
    port: parseInt(process.env.APP_PORT ?? '4000'),
  });

  const clientConfig = () => ({
    host: process.env.CLIENT_HOST ?? 'http://localhost:3000',
  });


  // GOOGLE_CLIENT_ID
  const googleConfig = () => ({
    // Auth
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientScret: process.env.GOOGLE_CLIENT_SECRET,  
  });
/*
  const awsCognitoAdvertiserConfig = () => ({
    userPoolId: process.env.AWS_COGNITO_ADVERTISER_USERPOOL_ID,
    region: process.env.AWS_COGNITO_ADVERTISER_REGION,
    clientId: process.env.AWS_COGNITO_ADVERTISER_CLIENT_ID,
    clientSecret: process.env.AWS_COGNITO_ADVERTISER_CLIENT_SECRET,
  });
*/

export const environment = () => ({
    server: serverConfig(),
    client: clientConfig(),
  //  aws: awsConfig(),
    google: googleConfig(),
   
  });
  