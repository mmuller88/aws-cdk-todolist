import { App } from '@aws-cdk/core';
import { AppSyncStack } from './appsync-stack';

// for development, use account/region from cdk cli
const devEnv = {
  account: '981237193288',
  region: 'eu-central-1',
};

const app = new App();

new AppSyncStack(app, 'appsync-stack-dev', {
  env: devEnv,
  stage: 'dev',
});

app.synth();