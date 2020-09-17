import * as React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Link } from "@chakra-ui/react";

type StreamContentProps = {
    markdown: string
};

const StreamContent = ({markdown}: StreamContentProps) => {
    return <ReactMarkdown
        plugins={[gfm]}
        children={markdown}
        components={{
            a: ({node, ...props}) => <Link {...props} isExternal/>
        }}
    />;
};

export default StreamContent;
