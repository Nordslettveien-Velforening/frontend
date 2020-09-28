import React from "react";
import Link from "next/link";

const Header = () => {

    return (
        <header className="header">
            <Link href="/"><a className="header__title" >Nordslettveien Velforening</a></Link>
        </header>
    )
};

export default Header
