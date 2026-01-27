const getEnvVar = (name: string, fallback?: string): string => {
    const value = process.env[name];
    if (!value && fallback === undefined) {
        throw new Error(`❌ Environment variable "${name}" is not defined`);
    }
    return value ?? fallback!;
};

export const ENV = {
    // Server
    PORT: getEnvVar('PORT', '4000'),
    MONGODB_URI: getEnvVar('MONGODB_URI'),
    MONGODB_DB_NAME: getEnvVar('MONGODB_DB_NAME'),

    // JWT
    JWT_ACCESS_SECRET: getEnvVar('JWT_ACCESS_SECRET'),
    JWT_REFRESH_SECRET: getEnvVar('JWT_REFRESH_SECRET'),
    JWT_ACCESS_EXPIRES_IN: getEnvVar('JWT_ACCESS_EXPIRES_IN', '15m'),
    JWT_REFRESH_EXPIRES_IN: getEnvVar('JWT_REFRESH_EXPIRES_IN', '7d'),

    // Google OAuth
    GOOGLE_CLIENT_ID: getEnvVar('GOOGLE_CLIENT_ID', ''),
    GOOGLE_CLIENT_SECRET: getEnvVar('GOOGLE_CLIENT_SECRET', ''),
    GOOGLE_CALLBACK_URL: getEnvVar('GOOGLE_CALLBACK_URL', 'http://localhost:4000/auth/google/callback'),

    // Resend (email)
    RESEND_API_KEY: getEnvVar('RESEND_API_KEY', ''),
    RESEND_FROM_EMAIL: getEnvVar('RESEND_FROM_EMAIL', 'noreply@example.com'),

    // Frontend URL (for redirects and email links)
    FRONTEND_URL: getEnvVar('FRONTEND_URL', 'http://localhost:3000'),
};
