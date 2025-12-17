'use client';

import { forwardRef, useState } from 'react';
import UiInput from '../UiInput/UiInput';
import { EyeIcon, EyeOffIcon } from '@/shared/icons';
import type { UiPasswordInputProps } from './types';

/**
 * Password input component with visibility toggle
 * Wrapper around UiInput with eye icon functionality
 */
const UiPasswordInput = forwardRef<HTMLInputElement, UiPasswordInputProps>(
    (props, ref) => {
        const { defaultVisible = false, ...rest } = props;
        const [showPassword, setShowPassword] = useState(defaultVisible);

        const toggleVisibility = () => {
            setShowPassword((prev) => !prev);
        };

        return (
            <UiInput
                {...rest}
                ref={ref}
                type={showPassword ? 'text' : 'password'}
                rightIcon={
                    <button
                        type="button"
                        onClick={toggleVisibility}
                        className="pointer-events-auto cursor-pointer text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
                        aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                        }
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                }
            />
        );
    }
);

UiPasswordInput.displayName = 'UiPasswordInput';

export default UiPasswordInput;
