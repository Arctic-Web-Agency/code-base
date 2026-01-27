import {
    IsEmail,
    IsOptional,
    IsString,
    Matches,
    MinLength,
} from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
            'Password must contain at least one lowercase letter, one uppercase letter, and one number',
    })
    password: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    name?: string;
}
