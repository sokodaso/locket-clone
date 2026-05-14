import {BrowserRouter as Router, Routes, Route } from 'react-router';
import User from './users/pages/UserPage';
import UserPosts from './posts/pages/UserPosts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users/:userId" element={< User />} />
        <Route path="/users/:userId/posts" element={<UserPosts/>} />
      </Routes>
    </Router>
  );
}

export default App;
