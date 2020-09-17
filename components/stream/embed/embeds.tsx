import * as React from "react";
import LoadEmbed from "./load-embed";
import EmbedContent from "./embed-content";

type EmbedsProps = {
    urls: Set<string>;
};

const Embeds = ({urls}: EmbedsProps) => {
    return (
        <>
            {Array.from(urls).map((url, i) =>
                <LoadEmbed url={url} key={`url${i}`}>
                    { data => <EmbedContent data={data}/> }
                </LoadEmbed>
            )}
        </>
    );
};

export default Embeds;
