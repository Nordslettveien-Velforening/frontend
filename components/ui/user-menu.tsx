import * as React from "react";
import { Button, forwardRef, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, MenuOptionGroup } from "@chakra-ui/react";
import NextLink from "next/link";
import { BiChevronDown } from "react-icons/bi";
import { useAuth } from "../authentication";
import { useRouter } from "next/router";

const UserMenu = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const onLogout = () => {
        logout().then(() => {
            console.log("user-menu: Logout completed. Redirecting to /");
            router.push("/")
        })
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

const MenuLink = forwardRef((props, _) => {
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
})

export default UserMenu;
