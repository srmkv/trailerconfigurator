import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Users from "./Users";
import Trailers from "./Trailers";
import Site from "./Site";
import TrailersList from './components/TrailersList';
import Gallery from './components/Gallery';
import TrailersWithOptions from './components/TrailersWithOptions';

import './App.css';  // Подключаем CSS файл для стилей


import './assets/css/all.css';
import './assets/css/bootstrap.min.css';

import './assets/css/animate.css';
import './assets/css/swiper.css';
import './assets/css/magnific-popup.css';
import './assets/css/style.css';
function App() {
  return (
    <Router>
      <div>
       
        <Routes>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/list" element={<TrailersList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/trailers" element={<Trailers />} />
          <Route path="/options" element={<TrailersWithOptions />} />
          <Route path="/" element={<Site />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
