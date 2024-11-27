// AboutSlider.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function AboutSlider2() {
  const product = [
    {
      images: [
        "/uploads/about/Путешествия/IMGP6415.webp",
        "/uploads/about/Путешествия/IMGP6517.webp",
      ]
    }
  ];

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerPadding: '40px',
    arrows: false,
  };

  return (
    <div className="container">
      <Slider {...settings2}>
        {product[0].images.map((image, idx) => (
          <div key={idx}>
            <img src={image} alt={`Image ${idx}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AboutSlider2;
