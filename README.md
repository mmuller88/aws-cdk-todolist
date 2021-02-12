synth: [![Synth](https://usz4mw9bjf.execute-api.eu-central-1.amazonaws.com/prod/)](https://usz4mw9bjf.execute-api.eu-central-1.amazonaws.com/prod/?url=true)

update pipeline: [![Synth](https://usz4mw9bjf.execute-api.eu-central-1.amazonaws.com/prod/?projectName=CdkPipelineUpdatePipelineSe-NGzkFjkPK9uo)](https://usz4mw9bjf.execute-api.eu-central-1.amazonaws.com/prod/?url=true&projectName=CdkPipelineUpdatePipelineSe-NGzkFjkPK9uo)

# aws-cdk-todolist

This is a Todolist backed up by AWS AppSync and a DynamoDB. It is managed with AWS CDK and my [aws-cdk-staging-pipeline](https://github.com/mmuller88/aws-cdk-staging-pipeline)

# Projen

[Projen](https://github.com/projen/projen) is a very cool framework to automatically synth project files. If you want make changes to git files like .gitignore or the package.json use .projen.js and run

```
npx projen
```

# AWS CDK

For deploy to AWS run:

```
yarn install
yarn cdkDeploy --all --profile X
```

For destroy run:

```
yarn cdkDestroy --all --profile X
```
