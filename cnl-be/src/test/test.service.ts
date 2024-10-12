import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { AWSService } from 'src/aws/aws.service'; 
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand} from '@aws-sdk/lib-dynamodb';


@Injectable()
export class TestService {

  constructor(private readonly awsService: AWSService) {}

  private dynamoDBClient = new DynamoDBClient({
    region: this.awsService.region,
    credentials:{
      accessKeyId: this.awsService.accessKey,  
      secretAccessKey: this.awsService.secretKey,
    },
  });
  private dynamoDBDocClient = DynamoDBDocumentClient.from(this.dynamoDBClient);
  configService: any;

 
  
  async addTestData(testData: { randomId: string; message: string }): Promise<void> {

    const params = {
      TableName: 'test-table',
      Item: {
        randomId: testData.randomId,
        message: testData.message,
      },
    };

    try {
      const command = new PutCommand(params);
      await this.dynamoDBDocClient.send(command);
      console.log('Item added successfully');
    } catch (error) {
      console.error('Error adding item to DynamoDB:', error);
      throw new InternalServerErrorException('Error adding item to DynamoDB');
    }
  }
}