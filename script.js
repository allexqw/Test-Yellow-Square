const buttonContact = document.querySelector(".header__menu-contact");
const contact = document.querySelector(".header__contacts");
const buttonMenu = document.querySelector(".header__menu-burger");
const menu = document.querySelector(".header__menu");

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");

const page = document.querySelectorAll(".page[data-page]");
const menuLinks = document.querySelectorAll(".menu__link[data-link]");
const items = document.querySelectorAll(".item");
const itemButton = document.querySelectorAll(".items");
const select = document.querySelectorAll(".select");

const popupCloseIcon = document.querySelectorAll(".close-popup");
const lockPadding = document.querySelector(".lock-padding");
let phone = false;
let lockPopup = true;
let phoneNumber;
const inputsButton = document.querySelectorAll(".request__form-button-items");
let inputs = document.querySelectorAll(".request__form-input");
let im = new Inputmask("+375 (99) 999 99 99");
im.mask(inputs);

inputsButton.forEach((item) => {
  item.addEventListener("click", () => {
    changePhone();
    if (phone == true) {
      invalidFormRemove();
    } else {
      invalidFormAdd();
    }
  });
});

const regex = /^\+375 (\((17 |25|29|33|44)\)) [0-9]{3} [0-9]{2} [0-9]{2}$/;

function onFocus() {
  inputs.forEach((item) => {
    item.value = [];
  });
}

function changePhone() {
  inputs.forEach((item) => {
    if (item.value != "") {
      phoneNumber = item.value;
      phone = regex.test(item.value) ? true : false;
      lockPopup = phone;
      if (phone == true) {
        invalidFormRemove();
        item.value = "";
      } else {
        invalidFormAdd();
      }
    }
  });
}
function closeSelect(elem) {
  const element = elem.querySelectorAll(".select");
  elem.classList.remove("open");
  element.forEach((item) => {
    item.classList.remove("open");
    if (item.classList.contains("active-select")) {
      active.push(item.innerHTML);
    }
  });
}
function openSelect(elem) {
  elem.classList.add("open");
  const element = elem.querySelectorAll(".select");
  element.forEach((item) => {
    item.classList.add("open");
  });
}

let active = [];
if (itemButton.length > 0) {
  itemButton.forEach((elem) => {
    active = [];
    elem.addEventListener("click", () => {
      const chooseItems = elem.querySelectorAll(".item");
      const selectItem = document.querySelectorAll(".select.open");
      const chooseItem = elem.querySelector(".choose-item");
      if (!selectItem.length) {
        chooseItems.forEach((item) => {
          active = [];
          item.addEventListener("click", (e) => {
            if (
              elem.classList.contains("calculator__equipment") ||
              elem.classList.contains("calculator__problem")
            ) {
              item.classList.toggle("active-select");
            } else {
              chooseItems.forEach((item) => {
                item.classList.remove("active-select");
              });
              item.classList.add("active-select");
            }
          });
          active = [];
        });
        openSelect(elem);
      } else {
        closeSelect(elem);
      }

      if (active.length == 0) {
      } else {
        chooseItem.innerHTML = active;
        chooseItem.scrollIntoView(false);
        chooseItem.style.top = "0";
        active = [];
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

if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const elem = popupCloseIcon[index];
    elem.addEventListener("click", (e) => {
      popupClose(elem.closest(".popup"));
      setTimeout(bodyUnlock, 300);
    });
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".main").offsetWidth + "px";
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
  if (currentPopup.id == "popup-call") {
    lockPopup = true;
    invalidFormRemove();
  }
  if (currentPopup && lockPopup) {
    phoneNumber = "";
    const popupActive = document.querySelector(".popup.open");
    if (popupActive && phone) {
      popupClose(popupActive);
    } else {
      bodyLock();
    }
    if (currentPopup.id == "popup") {
      if (phone) {
        currentPopup.classList.add("open");
      } else {
      }
    } else {
      currentPopup.classList.add("open");
      if (currentPopup.id == "popup-call") {
        inputs.forEach((item) => {
          if (item.offsetParent.className == "popup-call__container") {
            item.focus();
          }
        });
      }
    }
  }
}
const formItem = document.querySelectorAll(".form");
function invalidFormAdd() {
  formItem.forEach((item) => {
    item.classList.add("invalid");
  });
}
function invalidFormRemove() {
  formItem.forEach((item) => {
    item.classList.remove("invalid");
  });
}
function popupClose(popupActive) {
  popupActive.classList.remove("open");
  invalidFormRemove();
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

if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", menuClick);
  });
  function menuClick(e) {
    removeActive(menu, buttonMenu);
    const menuLink = e.target;
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
      if (menuLink.outerText == "Заказать звонок") {
        inputs.forEach((item) => {
          const footer = document.querySelector(".footer");
          const input = footer.querySelector(".request__form-input");
          if (item == input) {
            item.focus();
          }
        });
      }
      e.preventDefault();
    }
  }
}
