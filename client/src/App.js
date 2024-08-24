import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Users from "./Users";
import Trailers from "./Trailers";
import TrailersList from './components/TrailersList';
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/trailers">Trailers</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<TrailersList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/trailers" element={<Trailers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
