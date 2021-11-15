const buttonContact = document.querySelector(".header__menu-contact");
const contact = document.querySelector(".header__contacts");
const buttonMenu = document.querySelector(".header__menu-burger");
const menu = document.querySelector(".header__menu");

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");

const items = document.querySelectorAll(".item");
const itemButton = document.querySelectorAll(".items");
const select = document.querySelectorAll(".select");

const formInputPopup = document.querySelector(".request__form-input-popup");
const formInput = document.querySelector(".request__form-input");
const formField = document.querySelector(".request__form-field");
const formFieldPopup = document.querySelector(".request__form-field-popup");

let phoneNumber = "+375";
let phone = false;
document.addEventListener("keypress", (e) => {
  console.log(phoneNumber.length);
  if (document.querySelector(".popup.open")) {
    formInputPopup.readOnly = true;
    if (phoneNumber.length < 13) {
      getNumber(e.key, formInputPopup);
    } else {
      getNumber("");
    }
  } else {
    formInput.readOnly = true;
    if (phoneNumber.length < 13) {
      getNumber(e.key, formInput);
    } else {
      getNumber("");
    }
  }
});

function getNumber(number, input) {
  phoneNumber = phoneNumber + number;
  let form = phoneNumber.split("");
  let formVal = [];
  console.log(formVal);
  for (let i = 0; i < form.length; i++) {
    if (i == 4) {
      formVal.push(" (");
    }

    if (i == 6) {
      formVal.push(") ");
    }

    if (i == 9) {
      formVal.push(" ");
    }
    if (i == 11) {
      formVal.push(" ");
    }

    formVal.push(form[i]);
  }
  console.log(formVal);
  console.log(formVal.join(""));
  input.value = formVal.join("");
}

function validationPhone(phoneNumber) {
  const regex = /^\+375((17 |25|29|33|44))[0-9]{3}[0-9]{2}[0-9]{2}$/;
  console.log(phoneNumber);
  if (regex.test(phoneNumber)) {
    console.log(true);
    phone = true;
  } else {
    phone = false;
    console.log(false);
  }
}

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
      setTimeout(bodyUnlock, 300);
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
const invalidPhone = document.querySelector(".request__form-invalid-text");
const invalidPhonePopup = document.querySelector(
  ".request__form-invalid-text-popup"
);
const requestButton = document.querySelector(".request__form-button-items");
function bodyUnlock() {
  lockPadding.style.paddingRight = "0px";
  body.style.paddingRight = "0px";
  body.classList.remove("lock");
}

function popupOpen(currentPopup) {
  if (currentPopup) {
    validationPhone(phoneNumber);
    const popupActive = document.querySelector(".popup.open");
    if (popupActive && phone == true) {
      popupClose(popupActive);
    } else {
      bodyLock();
    }
    console.log(currentPopup);
    if (currentPopup.id == "popup") {
      if (phone) {
        currentPopup.classList.add("open");
        phoneNumber = "+375";
        invalidRemove(invalidPhone, formInput, formField);
        invalidRemove(invalidPhonePopup, formInputPopup, formFieldPopup);
        formInput.value = "";
        invalidPhone.style.display = "none";
      } else {
        console.log(invalidPhone);
        invalidAdd(invalidPhone, formInput, formField);
        invalidAdd(invalidPhonePopup, formInputPopup, formFieldPopup);
      }
    } else {
      currentPopup.classList.add("open");
      phoneNumber = "+375";
      if (currentPopup.id == "popup-call") {
        formInputPopup.focus();
        formInputPopup.value = phoneNumber;
      }
    }
  }
}

function invalidAdd(text, input, field) {
  text.style.display = "block";
  phoneNumber = "+375";
  input.value = phoneNumber;
  input.classList.add("invalid");
  field.classList.add("invalid");
}
function invalidRemove(text, input, field) {
  text.style.display = "none";
  phoneNumber = "+375";
  input.value = phoneNumber;
  input.classList.remove("invalid");
  field.classList.remove("invalid");
}

function popupClose(popupActive) {
  popupActive.classList.remove("open");
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
      console.log(menuLink.outerText);
      if (menuLink.outerText == "Заказать звонок") {
        formInput.focus();
        formInput.value = phoneNumber;
      }
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
