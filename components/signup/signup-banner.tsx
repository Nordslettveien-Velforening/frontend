import * as React from "react";
import { Button, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";

type SignupBannerProps = {};

const SignupBanner = ({}: SignupBannerProps) => {
    return (
        <>
            <Heading as="h2" size="md">Bor du i Nordslettveien?</Heading>
            <p>Ved å registrere deg får du nyhetsbrev på e-post, tilgang til å skrive innlegg og kommentarer i strømmen
                og motta SMS ved viktige hendelser, slik som f.eks. vannutkobling.</p>
            <Flex alignItems="center">
                <NextLink href="/ny-bruker">
                    <Button>Registrer deg</Button>
                </NextLink>
                <NextLink href={"/login"}><Link ml={4}>Logg inn</Link></NextLink>
            </Flex>
        </>
    );
};

export default SignupBanner;
