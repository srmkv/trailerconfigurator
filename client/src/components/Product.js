// ProductSlider.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function ProductSlider() {
  const products = [
    {
      title: "Товар 1",
      images: [
        "https://via.placeholder.com/300x200?text=Image+1",
        "https://via.placeholder.com/300x200?text=Image+2",
        "https://via.placeholder.com/300x200?text=Image+3",
      ],
      description: "Описание товара 1",
    },
    {
      title: "Товар 2",
      images: [
        "https://via.placeholder.com/300x200?text=Image+4",
        "https://via.placeholder.com/300x200?text=Image+5",
      ],
      description: "Описание товара 2",
    },
  ];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="product-slider">
      {products.map((product, index) => (
        <div key={index} className="product-card">
          <h3>{product.title}</h3>
          <Slider {...settings}>
            {product.images.map((image, idx) => (
              <div key={idx}>
                <img src={image} alt={`Product ${index} Image ${idx}`} />
              </div>
            ))}
          </Slider>
          <p>{product.description}</p>
          <button className="buy-button">Купить</button>
        </div>
      ))}
    </div>
  );
}

export default ProductSlider;