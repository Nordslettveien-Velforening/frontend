import { useAuth } from '../authentication';


const IfLoggedIn = ({children}) => {
    const auth = useAuth();
    return auth.isLoggedIn ? children : null
}

export default IfLoggedIn
