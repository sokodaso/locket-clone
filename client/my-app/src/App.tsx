import {BrowserRouter as Router, Routes, Route } from 'react-router';
import Users from './users/pages/Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
