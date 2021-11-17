const swiper = new Swiper(".service-items", {
  speed: 400,
  spaceBetween: 200,
  slidesPerView: 1,
  touchRatio: 2,
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },

  breakpoints: {
    752: {
      slidesPerView: 2,
      autoHeight: false,
      touchRatio: 0,
      simulateTouch: false,
      watchOverflow: false,
      slidesPerColumn: 3,
      spaceBetween: 0,
    },
    1008: {
      slidesPerView: 3,
      slidesPerColumn: 3,
      autoHeight: false,
      touchRatio: 0,
      simulateTouch: false,
      watchOverflow: false,
      spaceBetween: 0,
    },
  },
});

const swiperRepair = new Swiper(".popup-repair__content", {
  speed: 400,
  spaceBetween: 20,

  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },

  touchRatio: 2,
  breakpoints: {
    752: {
      slidesPerView: 1,
      autoHeight: false,
      touchRatio: 0,
      simulateTouch: false,
      watchOverflow: false,
      slidesPerColumn: 3,
    },
    1008: {
      slidesPerView: 4,
      slidesPerColumn: 1,
      autoHeight: false,
      touchRatio: 0,
      simulateTouch: false,
      watchOverflow: false,
      spaceBetween: 20,
    },
  },
});

const swiperSale = new Swiper(".popup-sale-phone__content", {
  speed: 500,
  // loop: true,
  spaceBetween: 100,

  slidesPerView: 1,
  touchRatio: 2,
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    752: {
      spaceBetween: 10,
      slidesPerView: 2,
      autoHeight: false,
      touchRatio: 2,
      loop: true,
    },
    1008: {
      loop: false,
      initialSlide: 0,
      // centeredSlides: true,
      slidesPerView: 3,
      slidesPerColumn: 3,
      autoHeight: false,
      touchRatio: 0,
      simulateTouch: false,
      watchOverflow: false,
      spaceBetween: 10,
    },
  },
});
