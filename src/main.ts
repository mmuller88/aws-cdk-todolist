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
  // We test if the graphql endpoint exist and gives us back a 401 because we are not authenticated
  testCommands: (stageAccount) => [
    `echo "${stageAccount.stage} stage"`,
    'STATUSCODE=$(curl --silent --output /dev/stderr --write-out "%{http_code}" $appsyncGraphQLEndpointOutput)',
    'echo Statuscode = $STATUSCODE',
    'if test $STATUSCODE -ne 401; then exit 1; fi',
  ],
  gitHub: {
    owner: 'mmuller88',
    oauthToken: core.SecretValue.secretsManager('alfcdk', {
      jsonField: 'muller88-github-token',
    }),
  },
});

app.synth();