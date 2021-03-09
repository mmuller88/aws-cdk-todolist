const { AwsCdkTypeScriptApp, NodePackageManager } = require('projen');

const project = new AwsCdkTypeScriptApp({
  authorAddress: 'damadden88@googlemail.de',
  authorName: 'martin.mueller',
  cdkVersion: '1.92.0',
  cdkVersionPinning: true,
  defaultReleaseBranch: 'main',
  jsiiFqn: 'projen.AwsCdkTypeScriptApp',
  name: 'aws-cdk-todolist',
  cdkDependencies: [
    '@aws-cdk/aws-appsync',
    '@aws-cdk/aws-codepipeline',
    '@aws-cdk/aws-codepipeline-actions',
    '@aws-cdk/pipelines',
    '@aws-cdk/aws-lambda-nodejs',
    '@aws-cdk/aws-dynamodb',
    '@aws-cdk/aws-cognito',
    '@aws-cdk/aws-iam',
  ],
  deps: [
    'aws-cdk-staging-pipeline',
  ],
  context: {
    '@aws-cdk/core:enableStackNameDuplicates': true,
    'aws-cdk:enableDiffNoFail': true,
    '@aws-cdk/core:stackRelativeExports': true,
    '@aws-cdk/core:newStyleStackSynthesis': true,
  },
  keywords: [
    'cdk',
    'aws',
    'todolist',
    'appsync',
    'graphql',
  ],
});

project.setScript('cdkDeploy', 'cdk deploy');
project.setScript('cdkDestroy', 'cdk destroy');

project.synth();
