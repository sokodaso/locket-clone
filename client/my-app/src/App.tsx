import {BrowserRouter as Router, Routes, Route} from 'react-router';
import { useState } from 'react';
import User from './users/pages/UserPage';
import UserPosts from './posts/pages/UserPosts';
import NewPost from './posts/pages/NewPost';
import AppBar from './shared/components/AppBar';
import Auth from './shared/pages/Auth';
import AuthContext from './context/Auth-Context';
import CustomNavigate from './shared/components/Navigate';

function App() {
  const [authState, setAuthState] = useState({
    userId: null as number | null,
    token: null as string | null
  });

  // Function to handle login and update auth state for token and userId when needed in the future
  const login = (userId: number, token: string) => {
    setAuthState({
      userId: userId,
      token: token
    });
  }

  const logout = () => {
    setAuthState({
      userId: null,
      token: null
    });
  };

  let routes;

  if (authState.token === null) {
    routes = (
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="*" element={<CustomNavigate to="/login" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route element={<AppBar />} >
          <Route path="/users/:userId" element={<User />} />
          <Route path="/users/:userId/posts" element={<UserPosts />} />
        </Route>
        <Route path="/posts/new" element={<NewPost />} />
        <Route path="*" element={<CustomNavigate to={`/users/${authState.userId}`} />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider value={{...authState, login, logout}}>
      <Router>
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
