import * as React from "react";
import { ReactNode, useEffect, useState } from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { InternalLinkMark } from "./block-content";
import { getContentSectionParent } from "../../integrations/sanityClient";


type InternalLinkProps = {
    target: InternalLinkMark
    children: ReactNode
};

const InternalLink = ({target, children}: InternalLinkProps) => {
    const [href, setHref] = useState("");
    const [loading, setLoading] = useState(true)

    if (!target) return <>{children}</>

    useEffect(() => {
        if (target.linkTo === "contentSection") {
            setLoading(true)
            getContentSectionParent(target.reference).then(parent => {
                setHref(`/artikkel/${parent.slug}#${target.slug}`)
                setLoading(false)
            })
        } else if (target.linkTo === "rootPage") {
            setHref(`/artikkel/${target.slug}`)
            setLoading(false)
        } else if (target.linkTo === "document") {
            setHref(`/dokument/${target.slug}`)
            setLoading(false)
        }
    }, [target]);

    if (loading) return <>{children}</>

    return <NextLink href={href} passHref><Link>{children}</Link></NextLink>;
};

export default InternalLink;
