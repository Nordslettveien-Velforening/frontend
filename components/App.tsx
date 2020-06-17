import * as React from "react";
import { LoginToggle } from "./authentication";

class App extends React.Component {

    render() {
        return (
            <main>
                <LoginToggle/>
                {this.props.children}
            </main>
        )
    }
}

export default App;
