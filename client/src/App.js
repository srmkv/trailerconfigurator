import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Users from "./Users";
import Trailers from "./Trailers";
import TrailersList from './components/TrailersList';
import TrailersWithOptions from './components/TrailersWithOptions';
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
            <li>
              <Link to="/options">Options</Link> 
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<TrailersList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/trailers" element={<Trailers />} />
          <Route path="/options" element={<TrailersWithOptions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
