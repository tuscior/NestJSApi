import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
    constructor(private readonly healthService: HealthService){}

    @Get()
    getHealth(): String {
        const health = this.healthService.getHealth();
        return health;
    }
    
}