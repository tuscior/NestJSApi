import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import config from '../../config';

@Injectable()
export class UploadService {
    s3: AWS.S3;
    constructor(){
        this.s3 = new AWS.S3({
            accessKeyId: config.AWSconfig.ACCESS_KEY_ID,
            secretAccessKey: config.AWSconfig.SECRET_ACCESS_KEY
        })
    }
    async upload(file): Promise<String>{
        const params = {
            Bucket: 'kt-image-bucket',
            Key: file.originalname,
            Body: file.buffer
        }
        const { Location } = await this.s3.upload(params).promise();
        return Location
    }
}