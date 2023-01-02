#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { config } from 'dotenv';

import { Chapter6Stack } from '../lib/chapter-6-stack';
import { Chapter6PipelineStack } from '../lib/chapter-6-pipeline-stack';

config({ path: '.env.production' });

const app = new cdk.App();

console.log(process.env.NODE_ENV)

if (['ONLY_DEV'].includes(process.env.CDK_MODE || '')) {
  new Chapter6Stack(app, `Chapter6Stack-${process.env.NODE_ENV || ''}`, {
    env: { region: 'us-east-1', account: process.env.CDK_DEFAULT_ACCOUNT },
  });
}

if (['ONLY_PROD'].includes(process.env.CDK_MODE || '')) {
  new Chapter6Stack(app, `Chapter6Stack-${process.env.NODE_ENV || ''}`, {
    env: { region: 'us-east-1', account: process.env.CDK_DEFAULT_ACCOUNT },
  });
}

if (['ONLY_PIPELINE'].includes(process.env.CDK_MODE || '')) {
  new Chapter6PipelineStack(app, 'Chapter6PipelineStack', {
    env: { region: 'us-east-1', account: process.env.CDK_DEFAULT_ACCOUNT },
  });
}
