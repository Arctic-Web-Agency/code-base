import type { UiInputProps } from '../UiInput/types';

/**
 * Props for UiPasswordInput component
 * Omits rightIcon and type from UiInputProps as they are controlled internally
 */
export interface UiPasswordInputProps
    extends Omit<UiInputProps, 'rightIcon' | 'type'> {
    /**
     * Whether password should be visible by default
     * @default false
     */
    defaultVisible?: boolean;
}
