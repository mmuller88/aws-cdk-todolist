import * as appsync from '@aws-cdk/aws-appsync';
import * as db from '@aws-cdk/aws-dynamodb';
import * as core from '@aws-cdk/core';
import { CustomStack } from 'aws-cdk-staging-pipeline/lib/custom-stack';

export interface AppSyncStackProps extends core.StackProps {
  readonly stage: string;
}

export class AppSyncStack extends CustomStack {
  constructor(scope: core.Construct, id: string, props: AppSyncStackProps) {
    super(scope, id, props);

    const todoTable = new db.Table(this, 'TodoTable', {
      removalPolicy: core.RemovalPolicy.DESTROY,
      partitionKey: {
        name: 'id',
        type: db.AttributeType.STRING,
      },
    });

    const graphQlApi = new appsync.GraphqlApi(this, 'GraphQlApi', {
      name: 'TodoList',
      schema: appsync.Schema.fromAsset('src/schema.graphql'),
    });

    const todoDS = graphQlApi.addDynamoDbDataSource('todoDataSource', todoTable);

    todoDS.createResolver({
      typeName: 'Query',
      fieldName: 'todoList',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });

    todoDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'todoAdd',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(appsync.PrimaryKey.partition('id').auto(), appsync.Values.attribute('body').is('$ctx.args.todoItem')),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

    todoDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'todoRemove',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbDeleteItem('id', 'id'),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });
  }
}