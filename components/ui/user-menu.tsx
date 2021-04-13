import * as React from "react";
import { Button, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, MenuOptionGroup } from "@chakra-ui/react";
import NextLink from "next/link";
import { BiChevronDown } from "react-icons/bi";
import { useAuth } from "../authentication";
import Router from "next/router";

const UserMenu = () => {
    const { user, logout } = useAuth();

    const onLogout = () => {
        logout().then(() => Router.push("/"));
    }

    if (!user) {
        return (
            <NextLink href={"/login"}>
                <Link>Logg inn</Link>
            </NextLink>
        )
    }

    return (
        <Menu>
            <MenuButton
                as={Button}
                aria-label="Options"
                rightIcon={<BiChevronDown />}
                backgroundColor="transparent"
                border="none"
                color="purple.500"
            >
                {user.givenName} {user.surname}
            </MenuButton>
            <MenuList>
                <MenuOptionGroup>
                <MenuItem>
                    <NextLink href="/minside">
                        <MenuLink>Min side</MenuLink>
                    </NextLink>
                </MenuItem>
                </MenuOptionGroup>
                <MenuDivider/>
                <MenuOptionGroup>
                    <MenuItem>
                        <MenuLink onClick={onLogout}>Logg ut</MenuLink>
                    </MenuItem>
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    );
};

const MenuLink = (props) => {
    return (
        <Link
            display="block"
            fontWeight="normal"
            _hover={{
                textDecoration: "none"
            }}
            {...props}
        >
            {props.children}
        </Link>
    )
}

export default UserMenu;
