import * as React from "react";
import NextLink from "next/link";
import { Flex, Link } from "@chakra-ui/react";
import UserMenu from "../user-menu";

const Header = () => {
    return (
        <Flex
            as="header"
            align="center"
            justify="space-between"
            px="2.5rem"
            backgroundColor="white"
            boxShadow="inset 0px -1px 0px #E2E8F0"
        >
            <NextLink href="/">
                <Link>Nordslettveien Velforening</Link>
            </NextLink>
            <UserMenu/>
        </Flex>
    );
};

export default Header;
