import {BrowserRouter as Router, Routes, Route } from 'react-router';
import User from './users/pages/UserPage';
import UserPosts from './posts/pages/UserPosts';
import NewPost from './posts/pages/NewPost';
import UpdatePost from './posts/pages/UpdatePost';
import AppBar from './shared/AppBar';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppBar />} >
          <Route path="/users/:userId" element={< User />} />
          <Route path="/users/:userId/posts" element={<UserPosts/>} />
        </Route>
        <Route path="/posts/new" element={<NewPost/>} />
        <Route path="/posts/:pid/edit" element={<UpdatePost/>} />
      </Routes>
    </Router>
  );
}

export default App;
