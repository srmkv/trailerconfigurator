(function ($) {
  "use strict";
  let device_width = window.innerWidth;
  $.exists = function (selector) {
    return $(selector).length > 0;
  };



  var vreJs = {
    m: function (e) {
      vreJs.d();
      vreJs.methods();
    },
    d: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      vreJs.mobileMenuActivation();
      vreJs.title_animation();
      vreJs.revelImageAnimation();
      vreJs.sectionSlideUp();
      vreJs.sectionSlideDown();
      vreJs.headerStickyMenu();
      vreJs.skew_up();
      vreJs.boxitem_slideup();
      vreJs.numberCounter();
      vreJs.videoPopup();
      vreJs.faq();
      vreJs.swiperActivation();
      vreJs.searchPopup();
      vreJs.wowAnimation();

    },

 

    // Start Wow Animation
    wowAnimation: function () {
      $(document).ready(function () {
        new WOW().init();
      });
    },
    // End Wow Animation

    // Start Search Popup
    searchPopup: function () {
      $(document).ready(function () {
        $(".header-search-bar").on("click", function () {
          $(".search-bar").addClass("active");
        });
        $(".search-popup-close").on("click", function () {
          $(".search-bar").removeClass("active");
        });
      });
    },
    // End Search Popup

    // Start Swiper Slider
    swiperActivation: function () {
      $(document).ready(function () {
        var swiper = new Swiper(".team-area-slider-home-2", {
          slidesPerView: 3,
          spaceBetween: 30,
          loop: true,
          breakpoints: {
            991: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
            767: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            },
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".client-say-home-3", {
          slidesPerView: 1,
          loop: true,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
    },
    // End Swiper Slider
    // Start Mobile Menu Activation
    mobileMenuActivation: function () {
      $(document).ready(function () {
        $(".menu-bar-btn").on("click", function () {
          $(".nft-mobile-menu").toggleClass("mobile-menu-active");
        });

        $(".nft-mobile-menu ul li.has-submenu a").each(function () {
          $(this).on("click", function () {
            $(this).siblings("ul").slideToggle();
          });
        });

        $(".close-menu").on("click", function () {
          $(".nft-mobile-menu").removeClass("mobile-menu-active");
        });
      });
    },
    // End Mobile Menu Activation

    // Start Faq
    faq: function () {
      $(document).ready(function () {
        document.querySelectorAll(".accordion-header").forEach((button) => {
          button.addEventListener("click", () => {
            const accordionContent = button.nextElementSibling;

            button.classList.toggle("active");

            if (button.classList.contains("active")) {
              accordionContent.style.maxHeight =
                accordionContent.scrollHeight + "px";
            } else {
              accordionContent.style.maxHeight = 0;
            }
            document
              .querySelectorAll(".accordion-header")
              .forEach((otherButton) => {
                if (otherButton !== button) {
                  otherButton.classList.remove("active");
                  otherButton.nextElementSibling.style.maxHeight = 0;
                }
              });
          });
        });
      });
    },
    // End Faq

    // Start Number Counter
    numberCounter: function () {
      $(document).ready(function () {
        (() => {
          const counter = document.querySelectorAll(".counter");
          const array = Array.from(counter);
          array.map((item) => {
            let counterInnerText = item.textContent;
            let count = 1;
            let speed = item.dataset.speed / counterInnerText;
            function counterUp() {
              item.textContent = count++;
              if (counterInnerText < count) {
                clearInterval(stop);
              }
            }
            const stop = setInterval(() => {
              counterUp();
            }, speed);
          });
        })();
      });
    },
    // End Number Counter

    // Start Video Popup
    videoPopup: function () {
      $(document).ready(function () {
        $(".popup-video").magnificPopup({
          type: "iframe",
        });
      });
      $(document).ready(function () {
        $(".popup-video-1").magnificPopup({
          type: "iframe",
        });
      });
    },
    // End Video Popup

    // Start Title ANimation 1
   

    // End Title  Animation 2
 

    // End Header Sticky Menu
  };
  vreJs.m();
})(jQuery, window);
