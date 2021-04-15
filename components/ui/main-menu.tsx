import * as React from "react";
import { ReactNode } from "react";
import NextLink from "next/link";
import Card from "./elements/card";
import { MainMenuItem } from "../../integrations/sanityClient";
import { Box, Icon, Link } from "@chakra-ui/react";
import { useRouter } from 'next/router'
import * as BiIcons from "react-icons/bi";

type MainMenuProps = {
    menuItems: MainMenuItem[]
}

type MenuItemProps = {
    href: string,
    title: string,
    isSelected: boolean,
    icon?: ReactNode
}

const MenuItem = ({href, title, isSelected, icon}: MenuItemProps) => {
    return (
        <Box as="nav"
            _notLast={{
                 marginBottom: "1rem"
            }}>
            <NextLink href={href}>
                <Link
                    display="grid"
                    gridTemplateColumns="1.5rem 1fr"
                    gridGap="0.5rem"
                    alignItems="center"
                    padding="1rem"
                    color={ isSelected ? "white " : "purple.700"}
                    background={ isSelected ? "purple.700" : "white" }
                    borderRadius="4px"
                    _hover={{
                        background: isSelected ? "purple.500" : "purple.50"
                    }}
                >
                    {icon || <Icon boxSize="1.5rem" as={BiIcons.BiDetail}/>} {title}
                </Link>
            </NextLink>
        </Box>
    )
}

const MainMenu = ({menuItems}: MainMenuProps) => {
    const router = useRouter()

    const isItemSelected = (href) => {
        return router.asPath === href
    }

    return (
        <Card width="18rem">
            <MenuItem
                href="/"
                title="Forsiden"
                isSelected={isItemSelected("/")}
                icon={<Icon boxSize="1.5rem" as={BiIcons.BiHomeAlt}/>}
            />
            { menuItems.map(item =>
                <MenuItem
                    key={item.id}
                    href={`/article/${item.slug}`}
                    title={item.title}
                    isSelected={isItemSelected(`/article/${item.slug}`)}
                    icon={item.icon && <Icon boxSize="1.5rem" as={BiIcons[item.icon]}/>}
                />
            )}
        </Card>
    );
};

export default MainMenu;
