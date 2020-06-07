import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../firebase';

class AuthContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
        };
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(
            authUser => {
                authUser
                    ? this.setState({authUser})
                    : this.setState({authUser: null});
            },
        );
    }

    componentWillUnmount() {
        this.listener();
    }

    render() {
        return (
            <AuthUserContext.Provider value={this.state.authUser}>
                { this.props.children }
            </AuthUserContext.Provider>
        );
    }
}

export default withFirebase(AuthContextProvider);