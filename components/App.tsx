import * as React from "react";
import { LoginToggle } from "./authentication";
import Header from "./layout/header";
import MenuBar from "./layout/main-menu/menu-bar";

class App extends React.Component {

    render() {
        return (
            <div>
                <Header/>
                <MenuBar>
                    Main menu
                </MenuBar>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default App;
