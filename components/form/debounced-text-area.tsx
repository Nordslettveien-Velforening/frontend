import React, { useEffect } from "react";
import debounce from "lodash/debounce";

export type DebouncedTextAreaProps = {
    onValue?: (value: string) => void,
    value?: string,
    delay?: number
}

const DebouncedTextArea = ({value, onValue, delay = 500}: DebouncedTextAreaProps) => {

    useEffect(() => {

    })

    const handleChange = debounce((val) => {
        if (onValue) onValue(val)
    }, delay);

    return <textarea onChange={(e) => handleChange((e.target as HTMLTextAreaElement).value)}/>
}

export default DebouncedTextArea;
