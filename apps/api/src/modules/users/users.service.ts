import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';

export interface CreateUserDto {
    email: string;
    password?: string;
    name?: string;
    provider?: 'credentials' | 'google' | 'magic-link';
    googleId?: string;
    emailVerified?: boolean;
    avatar?: string;
}

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async create(dto: CreateUserDto): Promise<UserDocument> {
        const user = new this.userModel(dto);
        return user.save();
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email: email.toLowerCase() }).exec();
    }

    async findByEmailWithPassword(email: string): Promise<UserDocument | null> {
        return this.userModel
            .findOne({ email: email.toLowerCase() })
            .select('+password')
            .exec();
    }

    async findById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id).exec();
    }

    async findByIdWithRefreshToken(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id).select('+refreshTokenHash').exec();
    }

    async findByGoogleId(googleId: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ googleId }).exec();
    }

    async verifyEmail(userId: string): Promise<UserDocument | null> {
        return this.userModel
            .findByIdAndUpdate(userId, { emailVerified: true }, { new: true })
            .exec();
    }

    async updateRefreshToken(
        userId: string,
        refreshToken: string | null,
    ): Promise<void> {
        const hash = refreshToken
            ? await bcrypt.hash(refreshToken, 10)
            : null;

        await this.userModel
            .findByIdAndUpdate(userId, { refreshTokenHash: hash })
            .exec();
    }

    async updateProfile(
        userId: string,
        data: { name?: string; avatar?: string },
    ): Promise<UserDocument | null> {
        return this.userModel
            .findByIdAndUpdate(userId, data, { new: true })
            .exec();
    }
}
