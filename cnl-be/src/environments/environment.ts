export type NodeEnv = 'local' | 'qa' | 'development' | 'production';

export type Environment = ReturnType<typeof environment>;
export type ServerConfig = ReturnType<typeof serverConfig>;
export type ClientConfig = ReturnType<typeof clientConfig>;
export type GoogleAuthConfig = ReturnType<typeof googleConfig>;
export type awsConfig = ReturnType<typeof awsConfig>;


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

  const awsConfig = () => ({
    defaultRegion: process.env.AWS_DEFAULT_REGION ||"us-east-2",
    aws_access_key: process.env.AWS_CNL_ACCESS_KEY,
    aws_secret_access_key: process.env.AWS_CNL_SECRET_ACCESS_KEY,
  });

export const environment = () => ({
    server: serverConfig(),
    client: clientConfig(),
    aws: awsConfig(),
    google: googleConfig(),
  });
  