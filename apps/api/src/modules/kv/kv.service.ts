import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Kv, KvDocument } from './kv.schema';

@Injectable()
export class KvService implements OnModuleInit {
    private readonly logger = new Logger(KvService.name);

    constructor(
        @InjectModel(Kv.name) private readonly kvModel: Model<KvDocument>
    ) {}

    async onModuleInit() {
        const count = await this.kvModel.estimatedDocumentCount();
        if (count === 0) {
            await this.kvModel.create({ key: 'example', value: 'hello' });
            this.logger.log(
                'Seeded KV with { key: "example", value: "hello" }'
            );
        }
    }

    findAll() {
        return this.kvModel.find().lean().exec();
    }

    findByKey(key: string) {
        return this.kvModel.findOne({ key }).lean().exec();
    }
}
