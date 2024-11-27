import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import './Gallery.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

const MyGallery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const allImages = [
    { id: 1, type: 'C25', url: '/uploads/live/C25/IMGP6338.webp' },
    { id: 2, type: 'C25', url: '/uploads/live/C25/IMGP8556.webp' },
    { id: 3, type: 'C25', url: '/uploads/live/C25/IMGP8585.webp' },
    { id: 4, type: 'C25', url: '/uploads/live/C25/IMG_5173.webp' },
    { id: 5, type: 'C25', url: '/uploads/live/C25/IMG_5185.webp' },
    { id: 6, type: 'C27', url: '/uploads/live/C27/IMGP8249.webp' },
    { id: 7, type: 'C27', url: '/uploads/live/C27/IMGP8260.webp' },
    { id: 8, type: 'C27', url: '/uploads/live/C27/IMGP8348.webp' },
    { id: 9, type: 'C27', url: '/uploads/live/C27/IMGP8512.webp' },
    { id: 10, type: 'C27', url: '/uploads/live/C27/IMGP8519.webp' },
    { id: 11, type: 'C30', url: '/uploads/live/C30/IMGP8181.webp' },
    { id: 12, type: 'C30', url: '/uploads/live/C30/IMGP8192.webp' },
    { id: 13, type: 'C30', url: '/uploads/live/C30/IMGP8218.webp' },
    { id: 14, type: 'C30', url: '/uploads/live/C30/IMGP8248.webp' },
    { id: 15, type: 'C30', url: '/uploads/live/C30/IMGP8353.webp' },
    { id: 16, type: 'C301', url: '/uploads/live/C30_13/IMGP8201.webp' },
    { id: 17, type: 'C301', url: '/uploads/live/C30_13/IMGP8249.webp' },
    { id: 18, type: 'C301', url: '/uploads/live/C30_13/IMGP8254.webp' },
    { id: 19, type: 'C301', url: '/uploads/live/C30_13/IMGP8268.webp' },
    { id: 20, type: 'C301', url: '/uploads/live/C30_13/IMGP8272.webp' },
    { id: 21, type: 'C35', url: '/uploads/live/C35/IMGP6316.webp' },
    { id: 22, type: 'C35', url: '/uploads/live/C35/IMGP6374.webp' },
    { id: 23, type: 'C35', url: '/uploads/live/C35/IMGP6388.webp' },
    { id: 24, type: 'C35', url: '/uploads/live/C35/IMGP6498.webp' },
    { id: 25, type: 'C35', url: '/uploads/live/C35/IMGP6504.webp' },
    { id: 26, type: 'C36', url: '/uploads/live/C36/959eb1e2-4c0b-42ba-9556-f257bf5eaf3d.webp' },
    { id: 27, type: 'C36', url: '/uploads/live/C36/97b5dd2b-8f02-4caa-8849-b2da5759e619.webp' },
    { id: 28, type: 'C36', url: '/uploads/live/C36/a66ae8ab-f2de-4531-bfdb-3cb87b0a9048.webp' },
    { id: 29, type: 'C36', url: '/uploads/live/C36/ec8f4a65-c2a6-451d-903c-9801002d99f7.webp' },
    { id: 30, type: 'C36', url: '/uploads/live/C36/f58f680a-a12b-4e6e-9ac6-d56d4436d0e3.webp' },
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (type) {
      setFilter(type);
    }
  }, [location]);

  const filteredImages =
    filter === 'all' ? allImages : allImages.filter((image) => image.type === filter);

  const handleFilterChange = (type) => {
    setFilter(type);
    navigate(`?type=${type}`);
  };

  return (
    <div className="gallery-container">
    <a href="/">
            <img src="/assets/images/logo.png" class="logotip" alt="VRE" />
          </a>
      <h2 className="gallery-title">Галерея с проектами</h2>
      <div className="filter-buttons">
        <button className="gallery-button" onClick={() => handleFilterChange('all')}>Все</button>
        <button className="gallery-button" onClick={() => handleFilterChange('C25')}>C25</button>
        <button className="gallery-button" onClick={() => handleFilterChange('C27')}>C27</button>
        <button className="gallery-button" onClick={() => handleFilterChange('C30')}>C30</button>
        <button className="gallery-button" onClick={() => handleFilterChange('C301')}>С30(1300мм)</button>
        <button className="gallery-button" onClick={() => handleFilterChange('C35')}>C35</button>
        <button className="gallery-button" onClick={() => handleFilterChange('C36')}>C36</button>
      </div>
      <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]} elementClassNames="gallery-grid">
        {filteredImages.map((image) => (
          <a key={image.id} href={image.url} className="gallery-item">
            <img src={image.url} alt={`${image.id}`} className="gallery-image" />
          </a>
        ))}
      </LightGallery>
    </div>
  );
};

export default MyGallery;
