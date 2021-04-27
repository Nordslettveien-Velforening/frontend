import * as React from "react";
const PortableText = require('@sanity/block-content-to-react')
import InternalLink from "./internal-link"
import Image from "./image";
import { SanityImageSource, SanityReference } from "@sanity/image-url/lib/types/types";
import { ReactNode } from "react";

interface BlockImage {
    node: {
        bilde: SanityImageSource;
        caption: string;
        alt: string;
    };
}

export interface InternalLinkMark {
    linkTo: string; // document type
    reference: SanityReference,
    slug: string
}

interface InternalLink {
    mark: InternalLinkMark;
    children: ReactNode
}

const serializers = {
    types: {
        blockImage: (props: BlockImage) => {
            return (
                <>
                    {props.node.bilde && (
                        <Image
                            sanityImage={props.node.bilde}
                            caption={props.node.caption}
                        />
                    )}
                </>
            );
        },
    },
    marks: {
        internalLink: ({mark, children} : InternalLink) => {
            return mark.reference ?
                <InternalLink target={mark}>{children}</InternalLink>
                : <>{children}</>
        },
        link: ({mark, children}) => {
            const { blank, href } = mark
            return blank ?
                <a href={href} target="_blank" rel="noopener">{children}</a>
                : <a href={href}>{children}</a>
        }
    }
}

const BlockContent = ({blocks}) => {
    return <PortableText
        blocks={blocks}
        serializers={serializers}
    />
};

export default BlockContent;
