import { Controller, Post, Body, UseInterceptors, UploadedFile} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService){}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file): Promise<Object> {
        const location = await this.uploadService.upload(file);
        return { location };
    }
}