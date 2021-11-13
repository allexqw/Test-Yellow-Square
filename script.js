const buttonContact = document.querySelector(".header__menu-contact");
const contact = document.querySelector(".header__contacts");
const buttonMenu = document.querySelector(".header__menu-burger");
const menu = document.querySelector(".header__menu");

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");

const items = document.querySelectorAll(".item");
const itemButton = document.querySelectorAll(".items");
const select = document.querySelectorAll(".select");

if (itemButton.length > 0) {
  itemButton.forEach((elem) => {
    const elements = elem.querySelectorAll(".select");
    elem.addEventListener("click", () => {
      const selectItem = document.querySelectorAll(".select.open");
      if (selectItem.length == 0) {
        elem.classList.add("open");
        elements.forEach((e) => {
          e.classList.add("open");
        });
      } else {
        selectItem.forEach((elem) => {
          elem.classList.remove("open");
        });
      }
    });
  });
}

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", (e) => {
      const popupName = popupLink.getAttribute("data-p");
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
    });
  }
}
const popupCloseIcon = document.querySelectorAll(".close-popup");
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const elem = popupCloseIcon[index];
    elem.addEventListener("click", (e) => {
      popupClose(elem.closest(".popup"));
    });
  }
}
const lockPadding = document.querySelector(".lock-padding");
console.log(lockPadding);
function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".main").offsetWidth + "px";
  console.log(lockPaddingValue);
  body.style.paddingRight = lockPaddingValue;
  lockPadding.style.paddingRight = lockPaddingValue;
  body.classList.add("lock");
}

function bodyUnlock() {
  lockPadding.style.paddingRight = "0px";
  body.style.paddingRight = "0px";
  body.classList.remove("lock");
}

function popupOpen(currentPopup) {
  if (currentPopup) {
    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      popupClose(popupActive);
    } else {
      bodyLock();
    }
    currentPopup.classList.add("open");
  }
}

function popupClose(popupActive) {
  popupActive.classList.remove("open");
  setTimeout(bodyUnlock, 300);
}

buttonContact.addEventListener("click", (e) => {
  removeActive(menu, buttonMenu);
  addActive(contact, buttonContact);
});

buttonMenu.addEventListener("click", (e) => {
  removeActive(contact, buttonContact);
  addActive(menu, buttonMenu);
});

let addActive = (element, elementButton) => {
  elementButton.classList.toggle("active");
  element.classList.toggle("active");
};
let removeActive = (element, elementButton) => {
  element.classList.remove("active");
  elementButton.classList.remove("active");
};
const page = document.querySelectorAll(".page[data-page]");
const menuLinks = document.querySelectorAll(".menu__link[data-link]");
console.log(menuLinks);
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", menuClick);
  });
  function menuClick(e) {
    removeActive(menu, buttonMenu);
    const menuLink = e.target;
    console.log(menuLink);
    page.forEach((item) => {
      if (
        menuLink.dataset.link == ".repair-page" ||
        menuLink.dataset.link == ".trade-in-page"
      ) {
        if (
          item.dataset.page == menuLink.dataset.link &&
          item.classList.contains("page")
        ) {
          item.classList.add("visible");
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
          item.classList.remove("visible");
        }
      }
    });
    menuLinks.forEach((menuLink) => {
      if (menuLink.classList.contains("active-link")) {
        menuLink.classList.remove("active-link");
      }
    });

    if (
      menuLink.dataset.link &&
      document.querySelector(menuLink.dataset.link)
    ) {
      menuLink.classList.add("active-link");
      const linkBlock = document.querySelector(menuLink.dataset.link);
      const linkBlockValue =
        linkBlock.getBoundingClientRect().top +
        pageYOffset -
        document.querySelector(".header").offsetHeight;
      window.scrollTo({
        top: linkBlockValue,
        behavior: "smooth",
      });

      e.preventDefault();
    }
  }
}

const swiper = new Swiper(".service-items", {
  speed: 400,
  spaceBetween: 200,
  // Optional parameters
  // direction: "horizontal",
  // loop: true,
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
