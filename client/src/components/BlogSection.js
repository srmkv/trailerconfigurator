import React from 'react';

const blogData = [
  {
    image: "assets/images/trailers/smallreal/Voyage-5436.jpg",
    alt: "Voyage 5436",
    link: "blog-standart.html",
    title: "ДЛЯ ЛЮБЫХ ЗАДАЧ",
    price: "От 100 000р",
    deliveryTime: "от 2х недель"
  },
  {
    image: "assets/images/trailers/smallreal/Voyage-5672.jpg",
    alt: "Voyage 5672",
    link: "blog-details.html",
    title: "ДЛЯ ПУТЕШЕСТВИЙ",
    price: "От 100 000р",
    deliveryTime: "От 2х недель"
  },
  {
    image: "assets/images/trailers/smallreal/Voyage-5729.jpg",
    alt: "Voyage 5729",
    link: "blog-details.html",
    title: "ДЛЯ АКТИВНОГО ОТДЫХА",
    price: "От 100 000р",
    deliveryTime: "От 2х недель"
  },
  {
    image: "assets/images/trailers/smallreal/Voyage-5753.jpg",
    alt: "Voyage 5753",
    link: "blog-details.html",
    title: "ДЛЯ ГРУЗОПЕРЕВОЗОК",
    price: "От 100 000р",
    deliveryTime: "От 2х недель"
  },
];

const BlogSection = () => {
  return (
    <section className="blog-area-home-1">
      <img
        src="assets/images/shep/bg-blur-shep-1.png"
        alt="Background Blur 1"
        className="blog-area-shep-1-home-1 blur-1"
      />
      <img
        src="assets/images/shep/bg-blur-shep-1.png"
        alt="Background Blur 2"
        className="blog-area-shep-2-home-1 blur-1"
      />
      <div className="container">
        <div className="title">
          <div className="sub-title">
            <p>Хиты продаж</p>
          </div>
          <div className="main-title">
            <h3 className="split-collab">
              ПРИЦЕПЫ VOYAGE
              <span>
                <img src="assets/images/shep/text-shep-1.png" alt="Voyage" />
              </span>
            </h3>
          </div>
        </div>
        <div className="blog-wrapper">
          <div className="row">
            {blogData.map((item, index) => (
              <div key={index} className="col-xl-6 col-lg-6">
                <div className={`blog-inner blog-inner-${index + 1} vre-reveal-one`}>
                  <img src={item.image} alt={item.alt} className="vre-reveal-image-one" />
                  <div className="blog-info">
                    <div className="blog-meta">
                      <div className="blog-category">
                        <span>{item.price}</span>
                      </div>
                      <div className="blog-date">
                        <span>{item.deliveryTime}</span>
                      </div>
                    </div>
                    <h5 className="font-size-1-24">
                      <a href={item.link}>{item.title}</a>
                    </h5>
                    <div className="blog-read-more">
                      <a href={item.link}>
                        <span className="font-size-1-16">Подробнее</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
