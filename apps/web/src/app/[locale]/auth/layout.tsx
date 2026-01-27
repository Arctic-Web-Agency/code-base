import { ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12 dark:bg-neutral-900">
            <div className="w-full max-w-md">
                <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-neutral-800">
                    {children}
                </div>
            </div>
        </div>
    );
}
