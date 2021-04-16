const { AwsCdkTypeScriptApp } = require('projen');

const project = new AwsCdkTypeScriptApp({
  authorAddress: 'damadden88@googlemail.de',
  authorName: 'martin.mueller',
  cdkVersion: '1.93.0',
  cdkVersionPinning: true,
  defaultReleaseBranch: 'main',
  jsiiFqn: 'projen.AwsCdkTypeScriptApp',
  name: 'aws-cdk-todolist',
  cdkDependencies: [
    '@aws-cdk/aws-appsync',
    '@aws-cdk/aws-dynamodb',
    '@aws-cdk/aws-cognito',
    '@aws-cdk/aws-iam',
  ],
  context: {
    '@aws-cdk/core:enableStackNameDuplicates': true,
    'aws-cdk:enableDiffNoFail': true,
    '@aws-cdk/core:stackRelativeExports': true,
    '@aws-cdk/core:newStyleStackSynthesis': true,
  },
});

project.synth();
