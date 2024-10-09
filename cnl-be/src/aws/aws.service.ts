import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { fromEnv } from '@aws-sdk/credential-providers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AWSService implements OnModuleInit {

  public ddbClient: DynamoDBDocumentClient;

  constructor(private readonly configService: ConfigService) {}


  async onModuleInit() {
    await this.initializeDynamoDBConnection();
  }

  // Initialize DynamoDB connection
  private async initializeDynamoDBConnection() {

    const region = this.configService.get<string>('AWS_DEFAULT_REGION');
    const accessKey = this.configService.get<string>('AWS_CNL_ACCESS_KEY');
    const secretKey = this.configService.get<string>('AWS_CNL_SECRET_ACCESS_KEY');


    try {
      const client = new DynamoDBClient({
        region: region,
        credentials: {
            accessKeyId: accessKey,  
            secretAccessKey: secretKey,
          },
      });

      this.ddbClient = DynamoDBDocumentClient.from(client);
      Logger.log('DynamoDB connection initialized');
    } catch (error) {
      Logger.error('Failed to initialize DynamoDB connection:', error);
      throw error;
    }
  }

  // Example method to list DynamoDB tables
  async listTables() {
    if (!this.ddbClient) {
      Logger.error('DynamoDB client is not initialized');
      throw new Error('DynamoDB client is not initialized');
    }

    try {
      const data = await this.ddbClient.send(new ListTablesCommand({}));
      Logger.log('Tables:', data.TableNames);
      return data.TableNames;
    } catch (error) {
      Logger.error('Error listing tables:', error);
      throw error;
    }
  }
}
