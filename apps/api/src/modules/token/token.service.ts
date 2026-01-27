import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { randomBytes } from 'crypto';
import { Token, TokenDocument, TokenType } from './token.schema';

@Injectable()
export class TokenService {
    constructor(
        @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    ) {}

    async create(
        userId: string,
        type: TokenType,
        expiresInMs: number = 24 * 60 * 60 * 1000, // Default 24 hours
    ): Promise<string> {
        // Delete any existing tokens of this type for this user
        await this.tokenModel.deleteMany({
            userId: new Types.ObjectId(userId),
            type,
        });

        const token = randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + expiresInMs);

        await this.tokenModel.create({
            token,
            userId: new Types.ObjectId(userId),
            type,
            expiresAt,
        });

        return token;
    }

    async verify(
        token: string,
        type: TokenType,
    ): Promise<{ userId: string } | null> {
        const tokenDoc = await this.tokenModel.findOne({
            token,
            type,
            expiresAt: { $gt: new Date() },
        });

        if (!tokenDoc) {
            return null;
        }

        return { userId: tokenDoc.userId.toString() };
    }

    async delete(token: string): Promise<void> {
        await this.tokenModel.deleteOne({ token });
    }

    async deleteAllForUser(userId: string, type?: TokenType): Promise<void> {
        const query: { userId: Types.ObjectId; type?: TokenType } = {
            userId: new Types.ObjectId(userId),
        };

        if (type) {
            query.type = type;
        }

        await this.tokenModel.deleteMany(query);
    }
}
