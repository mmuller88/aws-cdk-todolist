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
  }],
  branch: 'main',
  repositoryName: 'aws-cdk-todolist',
  badges: { synthBadge: true },
  customStack: (scope, stageAccount) => {
    const apiGwStack = new AppSyncStack(scope, `todolist-stack-${stageAccount.stage}`, {
      stackName: `todolist-stack-${stageAccount.stage}`,
      stage: stageAccount.stage,
    });
    return apiGwStack;
  },
  // all stages need manual approval
  manualApprovals: (stageAccount) => stageAccount.stage === 'prod',
  // not much test magic here yet. Will soon setup some Postman integration tests Check the property for instructions!
  testCommands: (stageAccount) => [
    `echo "${stageAccount.stage} stage"`,
    `echo ${stageAccount.account.id} id + ${stageAccount.account.region} region`,
  ],
  gitHub: {
    owner: 'mmuller88',
    oauthToken: core.SecretValue.secretsManager('alfcdk', {
      jsonField: 'muller88-github-token',
    }),
  },
});

// new BuildBadge(stack, 'BuildBadge', { hideAccountID: 'no' });

app.synth();