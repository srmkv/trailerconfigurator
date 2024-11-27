import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './CatalogProduct.css';

// Popup component with imageSliderSettings as a prop
function ProductPopup({ product, onClose, imageSliderSettings }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="popup-title">{product.title}</h3>
        <Slider {...imageSliderSettings} className="popup-image-slider slimg">
          {product.images.map((image, idx) => (
            <div key={`${product.title}-${idx}`} className="slider-image-wrapper ">
              <img src={image} alt={`${product.title} Image ${idx + 1}`} className="popup-image" />
            </div>
          ))}
        </Slider>

        <p className="popup-description" dangerouslySetInnerHTML={{ __html: product.sub }}></p>
              {product.icon && (
                <div className="icon-row-popup">
                  {product.icon.map((icon, idx) => (
                    <img
                      key={`${product.title}-icon-${idx}`}
                      src={icon}
                      alt={`${product.title} Icon ${idx + 1}`}
                      className="icon-image-popup"
                    />
                  ))}
                </div>
              )}
        <div className="popup-description" dangerouslySetInnerHTML={{ __html: product.description }}></div>
         <p className="popup-description">Цена от: {product.price}</p>
         <a href={product.url} className="blsrc" target="_blank">
            <button className="overlay-buttonslideBlack">Галерея</button>
             </a>
        <button className="close-button" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}

// Main CatalogProduct component
function CatalogProduct() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

 const products = [
    {
      title: "Voyage Classic C25",
      url: "/gallery?type=C25",
      images: [
        "/uploads/live/C25/IMGP6338.webp",
        "/uploads/live/C25/IMGP8556.webp",
        "/uploads/live/C25/IMGP8585.webp",
      ],
      icon: [
        "/assets/images/icon_trailer/1.png",
        
        "/assets/images/icon_trailer/3.png",
        "/assets/images/icon_trailer/4.png",
        "/assets/images/icon_trailer/5.png",
        "/assets/images/icon_trailer/6.png",
        "/assets/images/icon_trailer/7.png",
        "/assets/images/icon_trailer/8.png",
        "/assets/images/icon_trailer/9.png",
        "/assets/images/icon_trailer/10.png",
      ],
      sub: "Назначение:",
      price: "159900",
      size: "Базовое исполнение:<br>  Внутренний размер кузова 2,5 х 1,3 м.",
      description: `Базовое исполнение:<br>
    - Внутренний размер кузова 2,5 х 1,3 м.;<br> 
    - опорное колесо;<br> 
    - комбинированная светодиодная оптика;<br> 
    - отделка бортов: внутренняя часть-ламинированная фанера, наружная - стеклопластик;<br> 
    - боковые подножки: по 4 с каждой стороны;<br>
    - система опрокидывания кузова;<br>
    - возможность удлинения дышла на 350мм;<br>
    - Основание и каркасы бортов из оцинкованной стали с элементами из нержавеющей стали;<br>
    - Технически допустимая максимальная масса прицепа (полная масса):750 кг;<br>
    - Погрузочная высота: 545 мм;<br>
    - Вилка электропроводки:  7 pin (возможно подключение к розетке 13 pin через адаптер);<br>
    - Размерность шин: базовая R14 , опционально R13 или R15;<br>
    - Базовая высота каркаса 1100 мм (высота от пола 1470 мм);<br>
      Опционально:<br>
    - высота каркаса 1200 мм (высота от пола 1570 мм) или на заказ другой размер;
    `
    },
    {
      title: "Voyage Classic C27",
      url: "/gallery?type=C27",
      images: [
        "/uploads/live/C27/IMGP8249.webp",
        "/uploads/live/C27/IMGP8260.webp",
        "/uploads/live/C27/IMGP8348.webp",
      ],
      icon: [
        "/assets/images/icon_trailer/1.png",
       
        "/assets/images/icon_trailer/3.png",
        "/assets/images/icon_trailer/4.png",
        "/assets/images/icon_trailer/5.png",
        "/assets/images/icon_trailer/6.png",
        "/assets/images/icon_trailer/7.png",
        "/assets/images/icon_trailer/8.png",
        "/assets/images/icon_trailer/9.png",
        "/assets/images/icon_trailer/10.png",
      ],
      sub: "Назначение:",
      price: "179900",
      size: "Базовое исполнение:<br>  Внутренний размер кузова 2,7 х 1,5 м.",
      description: `Базовое исполнение:<br>
    - Внутренний размер кузова 2,7 х 1,5 м.;<br>
    - опорное колесо;<br>
    - комбинированная светодиодная оптика;<br> 
    - отделка бортов: внутренняя часть-ламинированная фанера, наружная - стеклопластик;<br> 
    - боковые подножки: по 4 с каждой стороны;<br> 
    - система опрокидывания кузова;<br>
    - возможность удлинения дышла на 350мм;<br>
    - Основание и каркасы бортов из оцинкованной стали с элементами из нержавеющей стали;<br>
    - Технически допустимая максимальная масса прицепа (полная масса):750 кг;<br>
    - Погрузочная высота: 545 мм;<br>
    - Вилка электропроводки:  7 pin (возможно подключение к розетке 13 pin через адаптер);<br>
    - Размерность шин: базовая R14 , опционально R13 или R15;<br>
    - Базовая высота каркаса 1100 мм (высота от пола 1470 мм);<br>
      Опционально:<br>
    - высота каркаса 1200 мм (высота от пола 1570 мм) или на заказ другой размер;`,
    },
    {
      title: "Voyage Classic C30",
      url: "/gallery?type=C30",
      images: [
        "/uploads/live/C30/IMGP8181.webp",
        "/uploads/live/C30/IMGP8192.webp",
        "/uploads/live/C30/IMGP8218.webp",
      ],
      icon: [
        "/assets/images/icon_trailer/1.png",
        "/assets/images/icon_trailer/2.png",
        "/assets/images/icon_trailer/3.png",
        "/assets/images/icon_trailer/4.png",
        "/assets/images/icon_trailer/5.png",
        "/assets/images/icon_trailer/6.png",
        "/assets/images/icon_trailer/7.png",
        "/assets/images/icon_trailer/8.png",
        "/assets/images/icon_trailer/9.png",
        "/assets/images/icon_trailer/10.png",
      ],
      sub: "Назначение:",
      price: "204900",
      size: "Базовое исполнение:<br>  Внутренний размер кузова 3,0 х 1,5 м.",
      description: `Базовое исполнение:<br>
    - Внутренний размер кузова 3,0 х 1,5 м.;<br>
    - опорное колесо;<br>
    - комбинированная светодиодная оптика;<br> 
    - отделка бортов: внутренняя часть-ламинированная фанера, наружная - стеклопластик;<br> 
    - боковые подножки: по 4 с каждой стороны;<br> 
    - система опрокидывания кузова;<br>
    - возможность удлинения дышла на 350мм.<br>
    - Основание и каркасы бортов из оцинкованной стали с элементами из нержавеющей стали;<br>
    - Технически допустимая максимальная масса прицепа (полная масса):750 кг;<br>
    - Погрузочная высота: 545 мм;<br>
    - Вилка электропроводки:  7 pin (возможно подключение к розетке 13 pin через адаптер);<br>
    - Размерность шин: базовая R14 , опционально R13 или R15;<br>
    - Базовая высота каркаса 1100 мм (высота от пола 1470 мм);<br>
      Опционально:<br>
    - высота каркаса 1200 мм (высота от пола 1570 мм) или на заказ другой размер;`,
    },
    {
      title: "Voyage Classic С30 1.3",
      url: "/gallery?type=C301",
      images: [
        "/uploads/live/C30_13/IMGP8201.webp",
        "/uploads/live/C30_13/IMGP8249.webp",
        "/uploads/live/C30_13/IMGP8268.webp",
      ],
      icon: [
        "/assets/images/icon_trailer/1.png",
        "/assets/images/icon_trailer/2.png",
        "/assets/images/icon_trailer/3.png",
        "/assets/images/icon_trailer/4.png",
        "/assets/images/icon_trailer/5.png",
        "/assets/images/icon_trailer/6.png",
        "/assets/images/icon_trailer/7.png",
        "/assets/images/icon_trailer/8.png",
        "/assets/images/icon_trailer/9.png",
        "/assets/images/icon_trailer/10.png",
      ],
      sub: "Назначение:",
      price: "204900",
       size: "Базовое исполнение:<br>  Внутренний размер кузова 3,0 х 1,3 м.",
      description:`Базовое исполнение:<br>
    - Внутренний размер кузова 3,0 х 1,3 м.;<br>
    - опорное колесо;<br>
    - комбинированная светодиодная оптика;<br> 
    - отделка бортов: внутренняя часть-ламинированная фанера, наружная - стеклопластик;<br> 
    - боковые подножки: по 4 с каждой стороны;<br> 
    - система опрокидывания кузова;<br>
    - возможность удлинения дышла на 350мм.<br>
    - Основание и каркасы бортов из оцинкованной стали с элементами из нержавеющей стали;<br>
    - Технически допустимая максимальная масса прицепа (полная масса):750 кг;<br>
    - Погрузочная высота: 545 мм;<br>
    - Вилка электропроводки:  7 pin (возможно подключение к розетке 13 pin через адаптер);<br>
    - Размерность шин: базовая R14 , опционально R13 или R15;<br>
    - Базовая высота каркаса 1100 мм (высота от пола 1470 мм);<br>
      Опционально:<br>
    - высота каркаса 1200 мм (высота от пола 1570 мм) или на заказ другой размер;`,
    },
    {
      title: "Voyage Classic C35",
      url: "/gallery?type=C35",
      images: [
        "/uploads/live/C35/IMGP6316.webp",
        "/uploads/live/C35/IMGP6374.webp",
        "/uploads/live/C35/IMGP6388.webp",
      ],
      icon: [
        "/assets/images/icon_trailer/1.png",
        "/assets/images/icon_trailer/2.png",
        "/assets/images/icon_trailer/3.png",
        "/assets/images/icon_trailer/4.png",
        "/assets/images/icon_trailer/5.png",
        "/assets/images/icon_trailer/6.png",
        "/assets/images/icon_trailer/7.png",
        "/assets/images/icon_trailer/8.png",
        "/assets/images/icon_trailer/9.png",
        "/assets/images/icon_trailer/10.png",
      ],
      sub: "Назначение:",
      price: "214900",
      size: "Базовое исполнение:<br>  Внутренний размер кузова 3,5 х 1,5 м.",
      description: `Базовое исполнение:<br> 
    - Внутренний размер кузова 3,5 х 1,5 м.;<br>  
    - опорное колесо;<br>
    - комбинированная светодиодная оптика;<br>  
    - отделка бортов: внутренняя часть-ламинированная фанера, наружная - стеклопластик;<br>  
    - боковые подножки: по 4 с каждой стороны;<br> 
    - система опрокидывания кузова;<br> 
    - возможность удлинения дышла на 350мм.<br>
    - Основание и каркасы бортов из оцинкованной стали с элементами из нержавеющей стали;<br>
    - Технически допустимая максимальная масса прицепа (полная масса):750 кг;<br>
    - Погрузочная высота: 545 мм;<br>
    - Вилка электропроводки:  7 pin (возможно подключение к розетке 13 pin через адаптер);<br>
    - Размерность шин: базовая R14 , опционально R13 или R15;<br>
    - Базовая высота каркаса 1100 мм (высота от пола 1470 мм);<br>
      Опционально:<br>
    - высота каркаса 1200 мм (высота от пола 1570 мм) или на заказ другой размер;`,
    },
    {
      title: "Voyage Classic C36",
      url: "/gallery?type=C36",
      images: [
        "/uploads/live/C36/97b5dd2b-8f02-4caa-8849-b2da5759e619.webp",
        "/uploads/live/C36/ec8f4a65-c2a6-451d-903c-9801002d99f7.webp",
      ],
      icon: [
        "/assets/images/icon_trailer/1.png",
        "/assets/images/icon_trailer/2.png",
        "/assets/images/icon_trailer/3.png",
        "/assets/images/icon_trailer/4.png",
        "/assets/images/icon_trailer/5.png",
        "/assets/images/icon_trailer/6.png",
        "/assets/images/icon_trailer/7.png",
        "/assets/images/icon_trailer/8.png",
        "/assets/images/icon_trailer/9.png",
        "/assets/images/icon_trailer/10.png",
      ],
      sub: "Назначение:",
      price: "224900",
      size: "Базовое исполнение:<br> Внутренний размер кузова 3,6 х 1,5 м.",
      description: `Базовое исполнение:<br>
    - Внутренний размер кузова 3,6 х 1,5 м.;<br> 
    - опорное колесо;<br> 
    - комбинированная светодиодная оптика;<br> 
    - отделка бортов: внутренняя часть-ламинированная фанера, наружная - стеклопластик;<br> 
    - боковые подножки: по 4 с каждой стороны;<br> 
    - система опрокидывания кузова;<br>
    - возможность удлинения дышла на 350мм.<br>
    - Основание и каркасы бортов из оцинкованной стали с элементами из нержавеющей стали;<br>
    - Технически допустимая максимальная масса прицепа (полная масса):750 кг;<br>
    - Погрузочная высота: 545 мм;<br>
    - Вилка электропроводки:  7 pin (возможно подключение к розетке 13 pin через адаптер);<br>
    - Размерность шин: базовая R14 , опционально R13 или R15;<br>
    - Базовая высота каркаса 1100 мм (высота от пола 1470 мм);<br>
      Опционально:<br>
    - высота каркаса 1200 мм (высота от пола 1570 мм) или на заказ другой размер;`,
    }
  ];

  // Настройки для внутреннего слайдера изображений продуктов
  const imageSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const handleOpenPopup = (product) => {
    setSelectedProduct(product);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setSelectedProduct(null);
  };

  return (
    <section id="product">
    <div className="catalog-container">
      <div className="products-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <h3 className="product-title">{product.title}</h3>
            <Slider {...imageSliderSettings} className="product-image-slider">
              {product.images.map((image, idx) => (
                <div key={`${product.title}-${idx}`} className="slider-image-wrapper">
                  <img src={image} alt={`${product.title} Image ${idx + 1}`} className="product-image" />
                </div>
              ))}
            </Slider>
            <p className="product-description" dangerouslySetInnerHTML={{ __html: product.sub }}></p>
              {product.icon && (
                <div className="icon-row">
                  {product.icon.map((icon, idx) => (
                    <img
                      key={`${product.title}-icon-${idx}`}
                      src={icon}
                      alt={`${product.title} Icon ${idx + 1}`}
                      className="icon-image"
                    />
                  ))}
                </div>
              )}

            <p className="product-description" dangerouslySetInnerHTML={{ __html: product.size }}></p>
            <p className="product-description">Цена от: {product.price}</p>
            <button 
              className="overlay-buttonslide" 
              onClick={() => handleOpenPopup(product)}
            >
              Подробнее
            </button>
          </div>
        ))}
      </div>

      {isPopupVisible && selectedProduct && (
        <ProductPopup 
          product={selectedProduct} 
          onClose={handleClosePopup} 
          imageSliderSettings={imageSliderSettings} 
        />
      )}
    </div>
    </section>
  );
}

export default CatalogProduct;