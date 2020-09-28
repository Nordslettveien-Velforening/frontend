import React from "react";
import Link from "next/link";

const MainMenu = () => {

    return (
        <>
            <nav><Link href={"/om-velforeningen"}><a>Om velforeningen</a></Link></nav>
            <nav><Link href={"/om-velforeningen"}>Retningslinjer og vedlikehold</Link></nav>
            <nav><a href={"/om-velforeningen"}>Retningslinjer og vedlikehold</a></nav>
        </>
    )
}

export default MainMenu
