import {createContext} from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    userId: number | null;
    //token: string | null;
    login: (userId: number) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    userId: null,
    //token: null,
    login: () => {},
    logout: () => {}
});

export default AuthContext;