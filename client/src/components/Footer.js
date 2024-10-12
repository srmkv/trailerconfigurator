import React from 'react';
import './Footer.css'; // Импортируйте CSS-файл для стилей

const Footer = () => {
  return (
    <section
      className="footer-area-home-3 footer-area-home-1"
      style={{ backgroundImage: "url('assets/images/home-2/footer-bg-home-2.png')" }}
    >
      <div className="container">
        <div className="footer-wrapper">
          <div className="row justify-content-between">
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="footer-item-1">
                <a href="index.html">
                  <img src="assets/images/logo/logo-1.svg" alt="VRE" />
                </a>
                <p className="font-size-1-16">
                  The world’s first and largest digital market <br />
                  for crypto collectibles and non-fungible <br />
                  (NFTs). Buy
                </p>
                <span className="font-size-1-16">
                  <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* SVG content */}
                  </svg>
                  86 Road Broklyn Street, 600 <br /> New York, USA
                </span>
                <span className="font-size-1-16">
                  <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* SVG content */}
                  </svg>
                  support@simplemail.com
                </span>
              </div>
            </div>
           
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="footer-item-3">
                <h4 className="title">Subscribe</h4>
               <span class="futer-cont">КОНТАКТЫ</span>
                    <p class="futer-cont2">г. Москва</p>
                    <p class="futer-cont2">ул. Мневники, д. 1</p>
                    <p class="futer-cont2">тел: +7(495)241-15-05</p>
                    <p class="futer-cont2">моб.: +7(920)251-20-86</p>

                <span class="futer-cont">г. Санкт-Петербург</span>
                     <p class="futer-cont2">Митрофаньевское шоссе, д. 10</p>
                     <p class="futer-cont2">тел: +7(495)241-15-05</p>
                     <p class="futer-cont2">моб.: +7(906)268-27-37</p>

                <span class="futer-cont">г. Павлово</span>
                     <p class="futer-cont2">ул. Комсомольская, д. 38</p>
                     <p class="futer-cont2">тел: +7(831)280-82-88</p>
                     <p class="futer-cont2">моб.: +7(920)251-20-86</p>
                <span class="futer-cont">Техническая поддержка:</span>
                      <p class="futer-cont2">тел: +7(495)241-15-05</p>

                <span class="futer-cont">Почта:</span>
                    <p class="futer-cont2">voyageautotech@ya.ru</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
