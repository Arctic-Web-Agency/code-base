import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Kv, KvSchema } from './kv.schema';
import { KvService } from './kv.service';
import { KvController } from './kv.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: Kv.name, schema: KvSchema }])],
    controllers: [KvController],
    providers: [KvService],
})
export class KvModule {}
