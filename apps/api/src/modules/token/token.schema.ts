import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;

export type TokenType = 'email-verification' | 'magic-link' | 'password-reset';

@Schema({ collection: 'tokens', timestamps: true })
export class Token {
    @Prop({ required: true, index: true })
    token: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    userId: Types.ObjectId;

    @Prop({
        required: true,
        type: String,
        enum: ['email-verification', 'magic-link', 'password-reset'],
    })
    type: TokenType;

    @Prop({ required: true, index: true })
    expiresAt: Date;

    createdAt: Date;
    updatedAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);

// TTL index to automatically delete expired tokens
TokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
