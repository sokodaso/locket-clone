import {BrowserRouter as Router, Routes, Route } from 'react-router';
import User from './users/pages/Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users/:userId" element={< User />} />
      </Routes>
    </Router>
  );
}

export default App;
