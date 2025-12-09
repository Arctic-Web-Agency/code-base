import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type KvDocument = HydratedDocument<Kv>;

@Schema({ collection: 'kv', timestamps: true })
export class Kv {
  @Prop({ required: true, index: true, unique: true })
  key!: string;

  @Prop()
  value?: string;
}

export const KvSchema = SchemaFactory.createForClass(Kv);
