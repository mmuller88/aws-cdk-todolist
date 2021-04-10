const { AwsCdkTypeScriptApp } = require('projen');

const project = new AwsCdkTypeScriptApp({
  authorAddress: 'damadden88@googlemail.de',
  authorName: 'martin.mueller',
  cdkVersion: '1.93.0',
  defaultReleaseBranch: 'main',
  jsiiFqn: 'projen.AwsCdkTypeScriptApp',
  name: 'aws-cdk-todolist',
});

project.synth();
