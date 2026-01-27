type RequestConfig = RequestInit & {
    params?: Record<string, string>;
};

interface ApiClientConfig {
    baseUrl: string;
    getAccessToken?: () => string | null;
    onTokenRefresh?: () => Promise<string | null>;
    onUnauthorized?: () => void;
}

class ApiClient {
    private baseUrl: string;
    private getAccessToken: () => string | null;
    private onTokenRefresh?: () => Promise<string | null>;
    private onUnauthorized?: () => void;
    private isRefreshing = false;
    private refreshPromise: Promise<string | null> | null = null;

    constructor(config: ApiClientConfig) {
        this.baseUrl = config.baseUrl;
        this.getAccessToken = config.getAccessToken || (() => null);
        this.onTokenRefresh = config.onTokenRefresh;
        this.onUnauthorized = config.onUnauthorized;
    }

    private async request<T>(
        endpoint: string,
        config: RequestConfig = {},
    ): Promise<T> {
        const { params, ...init } = config;

        let url = `${this.baseUrl}${endpoint}`;
        if (params) {
            const searchParams = new URLSearchParams(params);
            url += `?${searchParams.toString()}`;
        }

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...init.headers,
        };

        const accessToken = this.getAccessToken();
        if (accessToken) {
            (headers as Record<string, string>)['Authorization'] =
                `Bearer ${accessToken}`;
        }

        const response = await fetch(url, {
            ...init,
            headers,
            credentials: 'include',
        });

        // Handle 401 - try to refresh token
        if (response.status === 401 && this.onTokenRefresh) {
            const newToken = await this.handleTokenRefresh();

            if (newToken) {
                // Retry request with new token
                (headers as Record<string, string>)['Authorization'] =
                    `Bearer ${newToken}`;

                const retryResponse = await fetch(url, {
                    ...init,
                    headers,
                    credentials: 'include',
                });

                if (!retryResponse.ok) {
                    if (retryResponse.status === 401) {
                        this.onUnauthorized?.();
                    }
                    const error = await retryResponse.json().catch(() => ({}));
                    throw new ApiError(
                        error.message || 'Request failed',
                        retryResponse.status,
                        error,
                    );
                }

                return retryResponse.json();
            } else {
                this.onUnauthorized?.();
                throw new ApiError('Unauthorized', 401);
            }
        }

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new ApiError(
                error.message || 'Request failed',
                response.status,
                error,
            );
        }

        // Handle empty responses
        const text = await response.text();
        if (!text) {
            return {} as T;
        }

        return JSON.parse(text);
    }

    private async handleTokenRefresh(): Promise<string | null> {
        // Prevent multiple simultaneous refresh requests
        if (this.isRefreshing) {
            return this.refreshPromise;
        }

        this.isRefreshing = true;
        this.refreshPromise = this.onTokenRefresh!().finally(() => {
            this.isRefreshing = false;
            this.refreshPromise = null;
        });

        return this.refreshPromise;
    }

    async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.request<T>(endpoint, { ...config, method: 'GET' });
    }

    async post<T>(
        endpoint: string,
        data?: unknown,
        config?: RequestConfig,
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...config,
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async put<T>(
        endpoint: string,
        data?: unknown,
        config?: RequestConfig,
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...config,
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async patch<T>(
        endpoint: string,
        data?: unknown,
        config?: RequestConfig,
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...config,
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.request<T>(endpoint, { ...config, method: 'DELETE' });
    }
}

export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public data?: unknown,
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export function createApiClient(config: ApiClientConfig): ApiClient {
    return new ApiClient(config);
}

export type { ApiClient, ApiClientConfig };
