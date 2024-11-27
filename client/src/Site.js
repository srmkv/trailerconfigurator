// Site.js
import React, { useState } from 'react';
import Header from './components/Header';
import MapPopup from './components/MapPopup'; 
import MobileMenu from './components/MobileMenu';
import SearchBar from './components/SearchBar';
import VideoPlayer from './components/VideoPlayer';
import OfferArea from './components/OfferArea';
import MarqueArea from './components/MarqueArea';
import ClientSayArea from './components/ClientSayArea';
import GalleryButton from './components/GalleryButton';
import TrailersWithOptions from './components/TrailersWithOptions';
import TrailerDescription from './components/TrailerDescription';
import TrailerDescription2 from './components/TrailerDescription2';
import TrailerDescription3 from './components/TrailerDescription3';
import TrailerDescription4 from './components/TrailerDescription4';
import CatalogProduct from './components/CatalogProduct';
import Footer from './components/Footer';
import CenterText from './components/CenterText';

function Site() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <Header onOpenPopup={handleOpenPopup} />
      
      <MobileMenu />
      <SearchBar />
      <VideoPlayer />
      <CatalogProduct />
      <GalleryButton />
      <TrailersWithOptions />
      <MarqueArea />
      <OfferArea />

      <TrailerDescription />
      <TrailerDescription2 />
      <TrailerDescription3 />
      <TrailerDescription4 />
      <ClientSayArea />

      <Footer onOpenPopup={handleOpenPopup} />
      <CenterText />

      {/* Рендерим попап, если isPopupOpen == true */}
      {isPopupOpen && <MapPopup onClose={handleClosePopup} />}
    </div>
  );
}

export default Site;
