import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
    @Prop({ required: true, unique: true, lowercase: true, trim: true })
    email: string;

    @Prop({ select: false })
    password?: string;

    @Prop({ trim: true })
    name?: string;

    @Prop()
    avatar?: string;

    @Prop({ default: false })
    emailVerified: boolean;

    @Prop({
        type: String,
        enum: ['credentials', 'google', 'magic-link'],
        default: 'credentials',
    })
    provider: string;

    @Prop()
    googleId?: string;

    @Prop({ select: false })
    refreshTokenHash?: string;

    createdAt: Date;
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
