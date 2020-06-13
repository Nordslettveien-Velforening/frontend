import { useState } from "react";

export function useInput<T>(initialValue: T): {
    value: T | undefined,
    setValue: (v: T) => void,
    reset: () => void,
    bind: {}
} {
    const [value, setValue] = useState<T>(initialValue);

    return {
        value,
        setValue,
        reset: () => setValue(undefined),
        bind: {
            value,
            onChange: event => {
                setValue(event.target.value);
            }
        }
    };
};
