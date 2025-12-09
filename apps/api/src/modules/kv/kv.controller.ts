import { Controller, Get, Param } from '@nestjs/common';
import { KvService } from './kv.service';

@Controller('kv')
export class KvController {
    constructor(private readonly kvService: KvService) {}

    @Get()
    async getAll() {
        return this.kvService.findAll();
    }

    @Get(':key')
    async getByKey(@Param('key') key: string) {
        return this.kvService.findByKey(key);
    }
}
