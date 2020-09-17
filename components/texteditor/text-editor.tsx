import * as React from "react";
import { ChangeEvent } from "react";
import AutoResizeTextarea from "../ui/elements/auto-resize-textarea";

type TextEditorProps = {
    placeholder: string,
    value?: string
    onChange: (value: string) => void
};

const TextEditor = (props: TextEditorProps) => {

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onChange(e.target.value)
    }

    return  <AutoResizeTextarea
                {...props}
                minHeight="auto"
                maxHeight="12rem"
                overflowY="auto"
                backgroundColor="gray.100"
                borderRadius="2px"
                border="none"
                value={props.value}
                onChange={handleChange}/>
};

export default TextEditor
