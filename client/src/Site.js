import React from 'react';
import Header from './components/Header';

import MobileMenu from './components/MobileMenu';
import SearchBar from './components/SearchBar';
import VideoPlayer from './components/VideoPlayer';
import OfferArea from './components/OfferArea';
import MarqueArea from './components/MarqueArea';
import ClientSayArea from './components/ClientSayArea';
import BlogSection from './components/BlogSection';
import TrailersWithOptions from './components/TrailersWithOptions';
import TrailerDescription from './components/TrailerDescription';
import TrailerDescription2 from './components/TrailerDescription2';
import TrailerDescription3 from './components/TrailerDescription3';
import TrailerDescription4 from './components/TrailerDescription4';
import Footer from './components/Footer';

function Site() {
  return (
    <div>
      <Header />
     
      <MobileMenu />
      <SearchBar />
      <VideoPlayer />
      <TrailersWithOptions />
      <OfferArea />
      <TrailerDescription />
      <TrailerDescription2 />
      <TrailerDescription3 />
      <TrailerDescription4 />
       <ClientSayArea />
      <MarqueArea />
      <BlogSection />
     
      <Footer />
   
    </div>
  );
}

export default Site;
