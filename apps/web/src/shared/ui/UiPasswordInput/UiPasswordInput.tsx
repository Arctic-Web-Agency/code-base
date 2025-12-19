'use client';

import { forwardRef, useState } from 'react';
import UiInput from '../UiInput/UiInput';
import UiButton from '../UiButton/UiButton';
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
                    <UiButton
                        variant="icon"
                        size="sm"
                        onClick={toggleVisibility}
                        className="pointer-events-auto"
                        aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                        }
                        tabIndex={-1}
                        IconLeft={showPassword ? EyeOffIcon : EyeIcon}
                    />
                }
            />
        );
    }
);

UiPasswordInput.displayName = 'UiPasswordInput';

export default UiPasswordInput;
