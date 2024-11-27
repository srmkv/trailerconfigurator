// ProductSlider.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './ProductSlider.css';
function ProductSlider() {
  const products = [
    {
      title: "C25",
      images: [
        "/uploads/live/C25/IMGP6338.webp",
        "/uploads/live/C25/IMGP8556.webp",
        "/uploads/live/C25/IMGP8585.webp",

      ],
      description: `Базовое исполнение:<br>
- Внутренний размер кузова 2,5 х 1,3 м.;<br> 
- колеса: R14;<br> 
- опорное колесо ;<br> 
- комбинированная светодиодная оптика;<br> 
- отделка бортов: внутренняя часть-ламинированная фанера, наружная -стеклопластик;<br> 
- боковые подножки: по 4 с каждой стороны;<br>
- система опрокидывания кузова.<br>
- возможность удлинения дышла на 350мм.`
    },
  
    {
      title: "C27",
      images: [
        "/uploads/live/C27/IMGP8249.webp",
        "/uploads/live/C27/IMGP8260.webp",
        "/uploads/live/C27/IMGP8348.webp",

      ],
      description: `Базовое исполнение:<br>
- Внутренний размер кузова 2,7 х 1,5 м.;<br>
- колеса: R14;<br> 
- опорное колесо ;<br>
- комбинированная светодиодная оптика;<br> 
- отделка бортов: внутренняя часть-ламинированная фанера, наружная -стеклопластик;<br> 
- боковые подножки: по 4 с каждой стороны;<br> 
- система опрокидывания кузова.<br>
-возможность удлинения дышла на 350мм.`,
    },
    {
      title: "C30",
      images: [
        "/uploads/live/C30/IMGP8181.webp",
        "/uploads/live/C30/IMGP8192.webp",
        "/uploads/live/C30/IMGP8218.webp",

      ],
      description: `Базовое исполнение:<br>
- Внутренний размер кузова 3,0 х 1,5 м.;<br>
- колеса: R14;<br>
- опорное колесо ;<br>
- комбинированная светодиодная оптика;<br> 
- отделка бортов: внутренняя часть-ламинированная фанера, наружная -стеклопластик;<br> 
- боковые подножки: по 4 с каждой стороны;<br> 
- система опрокидывания кузова.<br>
-возможность удлинения дышла на 350мм.`,
    },
    {
      title: "С30(1300мм)",
      images: [
        "/uploads/live/C30_13/IMGP8201.webp",
        "/uploads/live/C30_13/IMGP8249.webp",
        "/uploads/live/C30_13/IMGP8268.webp",
        
      ],
      description:`Базовое исполнение:<br>
- Внутренний размер кузова 3,0 х 1,3 м.;<br>
- колеса: R14;<br>
- опорное колесо ;<br>
- комбинированная светодиодная оптика;<br> 
- отделка бортов: внутренняя часть-ламинированная фанера, наружная -стеклопластик;<br> 
- боковые подножки: по 4 с каждой стороны;<br> 
- система опрокидывания кузова.<br>
-возможность удлинения дышла на 350мм.`,
    },
    {
      title: "C35",
      images: [
        "/uploads/live/C35/IMGP6316.webp",
        "/uploads/live/C35/IMGP6374.webp",
        "/uploads/live/C35/IMGP6388.webp",

      ],
      description: `Базовое исполнение:<br> 
- Внутренний размер кузова 3,5 х 1,5 м.;<br>  
- колеса: R14;<br> 
- опорное колесо ;<br> 
- комбинированная светодиодная оптика;<br>  
- отделка бортов: внутренняя часть-ламинированная фанера, наружная -стеклопластик;<br>  
- боковые подножки: по 4 с каждой стороны; <br> 
- система опрокидывания кузова.<br> 
-возможность удлинения дышла на 350мм.`,
    },
    {
      title: "C36",
      images: [
        "/uploads/live/C36/97b5dd2b-8f02-4caa-8849-b2da5759e619.webp",
        "/uploads/live/C36/ec8f4a65-c2a6-451d-903c-9801002d99f7.webp",
   
      ],
      description: `Базовое исполнение:<br>
- Внутренний размер кузова 3,6 х 1,5 м.;<br> 
- колеса: R14;<br>
- опорное колесо ;<br> 
- комбинированная светодиодная оптика; <br>
- отделка бортов: внутренняя часть-ламинированная фанера, наружная -стеклопластик; <br>
- боковые подножки: по 4 с каждой стороны; <br>
- система опрокидывания кузова.<br>
-возможность удлинения дышла на 350мм.`,
    }
  ];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
     centerPadding: '40px',
  };

  const settings2 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
     centerPadding: '40px',
  };

return (
  <div className="container">
     <Slider {...settings} className="product-slider">
      {products.map((product, index) => (
        <div key={index} style={{ margin: "10px" }}>
          <div className="product-card">
            <h3>{product.title}</h3>
            <Slider {...settings2}>
              {product.images.map((image, idx) => (
                <div key={`${product.title}-${idx}`}>
                  <img src={image} alt={`Product ${index} Image ${idx}`} />
                </div>
              ))}
            </Slider>
            <p dangerouslySetInnerHTML={{ __html: product.description }}></p>
            <button className="overlay-buttonslide">Подробнее</button>
          </div>
        </div>
      ))}
    </Slider>
  </div>
);

}

export default ProductSlider;
