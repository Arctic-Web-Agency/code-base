import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ENV } from './config/env';
import { KvModule } from './modules/kv/kv.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(ENV.MONGODB_URI, {
            dbName: ENV.MONGODB_DB_NAME,
        }),
        KvModule,
        UsersModule,
        AuthModule,
        TokenModule,
        MailModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
