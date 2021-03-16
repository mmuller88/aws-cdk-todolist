import * as core from '@aws-cdk/core';
import { PipelineStack } from 'aws-cdk-staging-pipeline';
import { AppSyncStack } from './appsync-stack';

const app = new core.App();

new PipelineStack(app, 'todolist-pipeline', {
  stackName: 'todolist-pipeline',
  // Account and region where the pipeline will be build
  env: {
    account: '981237193288',
    region: 'eu-central-1',
  },
  // Staging Accounts e.g. dev qa prod
  stageAccounts: [{
    account: {
      id: '981237193288',
      region: 'eu-central-1',
    },
    stage: 'dev',
  }, {
    account: {
      id: '991829251144',
      region: 'eu-central-1',
    },
    stage: 'prod',
  }],
  branch: 'main',
  repositoryName: 'aws-cdk-todolist',
  customStack: (scope, stageAccount) => {
    const appSyncStack = new AppSyncStack(scope, `todolist-stack-${stageAccount.stage}`, {
      stackName: `todolist-stack-${stageAccount.stage}`,
      stage: stageAccount.stage,
    });
    return appSyncStack;
  },
  // all stages need manual approval
  manualApprovals: (stageAccount) => stageAccount.stage === 'prod',
  gitHub: {
    owner: 'mmuller88',
    oauthToken: core.SecretValue.secretsManager('alfcdk', {
      jsonField: 'muller88-github-token',
    }),
  },
});

app.synth();