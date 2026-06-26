import {createContext} from 'react';

interface AuthContextType {
    userId: number | null;
    token: string | null;
    login: (userId: number, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    userId: null,
    token: null,
    login: () => {},
    logout: () => {}
});

export default AuthContext;