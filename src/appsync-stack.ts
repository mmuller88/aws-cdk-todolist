import * as appsync from '@aws-cdk/aws-appsync';
import * as core from '@aws-cdk/core';
import { CustomStack } from 'aws-cdk-staging-pipeline/lib/custom-stack';

export interface AppSyncStackProps extends core.StackProps {
  readonly stage: string;
}

export class AppSyncStack extends CustomStack {
  constructor(scope: core.Construct, id: string, props: AppSyncStackProps) {
    super(scope, id, props);

    new appsync.GraphqlApi(this, 'GraphQlApi', {
      name: 'TodoList',
      schema: appsync.Schema.fromAsset('schema.graphql'),
    });
  }
}