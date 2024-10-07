import React from 'react';

const OfferArea = () => {
  return (
    <section className="offer-area-home-1">
      <img
        src="assets/images/shep/bg-blur-shep-1.png"
        alt="VRE"
        className="offer-area-1-shep-1 blur-1"
      />
      <div className="container">
        <div className="title">
          <div className="sub-title">
            <p>ВОЯЖАВТОТЕХ</p>
          </div>
          <div className="main-title">
            <h3 className="split-collab">
              Универсальные прицепы <br /> для легковых автомобилей
              <span>
                <img
                  src="assets/images/shep/text-shep-1.png"
                  alt=""
                />
              </span>
            </h3>
          </div>
        </div>

        <div className="offer-wrapper">
          <div className="row justify-content-center">
            {/* First Item */}
            <div className="col-xl-4 col-lg-4 col-md-6 vre-slide-up-gsap">
              <div className="offer-inner">
                <p className="font-size-1-24">ДЛЯ ЛЮБЫХ ЗАДАЧ</p>
                <img
                  src="assets/images/trailers/0020.jpg"
                  alt="VRE"
                />
                <div className="offer-work">
                  <span className="font-size-1-20">
                    подробнее о <br />
                    CLASSIC C25
                  </span>
                  <a href="services-details.html">
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Second Item */}
            <div className="col-xl-4 col-lg-4 col-md-6 vre-slide-up-gsap">
              <div className="offer-inner">
                <p className="font-size-1-24">ДЛЯ ГРУЗОПЕРЕВОЗОК</p>
                <img
                  src="assets/images/trailers/0002.jpg"
                  alt="VRE"
                />
                <div className="offer-work">
                  <span className="font-size-1-20">
                    подробнее о <br />
                    CLASSIC C36
                  </span>
                  <a href="services-details.html">
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Third Item */}
            <div className="col-xl-4 col-lg-4 col-md-6 vre-slide-up-gsap">
              <div className="offer-inner">
                <p className="font-size-1-24">ДЛЯ ПУТЕШЕСТВИЙ</p>
                <img
                  src="assets/images/trailers/0020_4.jpg"
                  alt="VRE"
                />
                <div className="offer-work">
                  <span className="font-size-1-20">
                    подробнее о <br />
                    CLASSIC C35
                  </span>
                  <a href="services-details.html">
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferArea;
