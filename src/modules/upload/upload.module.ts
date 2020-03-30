const AWS = require('aws-sdk');
const uuid = require('uuid/v1');

import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [],
  controllers: [UploadController],   
  providers: [UploadService],
  exports: [UploadService]
})
export class UploadModule {}