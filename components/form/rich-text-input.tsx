import React, { useCallback, useState } from "react";
import debounce from "lodash/debounce";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

export type RichTextEditorProps = {
    onValue: (value: string) => void
    defaultValue?: string,
    updateInterval?: number
}

const RichTextInput = ({onValue, defaultValue = "", updateInterval = 300}: RichTextEditorProps) => {
    const [html, setHtml] = useState(defaultValue);
    const sanitizeConf = {
        allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
        allowedAttributes: { a: ["href"] }
    };

    const sanitize = () => {
        const sanitized = sanitizeHtml(html, sanitizeConf);
        // TODO: Finn ut hvorfor ContentEditable gjør at state resettes.
        setHtml(sanitized);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        onValue(value)
        setHtml(value)
    }

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text");
        document.execCommand("insertText", false, text);
    }

    return <ContentEditable
        style={{ border: "1px solid #dadada", borderRadius: "3px", overflow: "auto", resizable: "both", minHeight: "4rem" }}
        html={html}
        onChange={handleChange}
        onBlur={sanitize}
        onPaste={handlePaste}/>;

}

export default RichTextInput;
