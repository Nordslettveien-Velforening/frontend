import React from "react";
import MainMenu from "./main-menu";
import SecondaryMenu from "./secondary-menu";

const MenuBar = (props) => {

    return (
        <div className="menu-bar">
            <div className="menu-bar__main-menu">
                <MainMenu />
            </div>
            <div className="menu-bar__secondary-menu">
                <SecondaryMenu />
            </div>
        </div>
    )
};

export default MenuBar
