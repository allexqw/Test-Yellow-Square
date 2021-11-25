const buttonContact = document.querySelector(".header__menu-contact");
const contact = document.querySelector(".header__contacts");
const buttonMenu = document.querySelector(".header__menu-burger");
const menu = document.querySelector(".header__menu");

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");

const page = document.querySelectorAll(".page[data-page]");
const menuLinks = document.querySelectorAll(".menu__link[data-link]");
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
  const element = elem.closest(".items");
  const items = element.querySelectorAll(".select.open");
  console.log("закрываем");

  items.forEach((item) => {
    item.classList.remove("open");
    element.classList.remove("open");
  });
  updateSelect(element);
}
function openSelect(elem) {
  const items = elem.closest(".items");
  console.log("открываем");
  items.classList.add("open");
  const element = items.querySelectorAll(".select");
  element.forEach((item) => {
    item.classList.add("open");
  });
}

let innerSelect = [];

function updateSelect(elem) {
  const activeItems = elem.querySelectorAll(".active-select");
  const inputSelect = elem.querySelector(".choose-item");
  activeItems.forEach((item) => {
    innerSelect.push(item.innerHTML);
    console.log("it is");
  });
  console.log(elem);
  if (elem.classList.contains("calculator__mobile")) {
    inputSelect.scrollIntoView(false);
  }
  inputSelect.innerHTML = innerSelect;
  innerSelect = [];
}

function chooseItem(elem) {
  console.log(elem);
  if (elem.classList.contains("active-select")) {
    elem.classList.remove("active-select");
  } else {
    elem.classList.add("active-select");
  }
  const activeItem = elem;
  const element = elem.closest(".items");
  const elements = element.querySelectorAll(".item");
  elements.forEach((item) => {
    if (
      item.classList.contains("equipment__item") ||
      item.classList.contains("problem__item")
    ) {
      // if (item == activeItem) {
      //   console.log("delete");
      //   item.classList.remove("active-select");
      // }
    } else {
      if (item != activeItem) {
        item.classList.remove("active-select");
      }
    }
  });
  // elem.classList.add("active-select");
  closeSelect(elem);
}

const selectItems = document.querySelectorAll(".item");
if (selectItems.length > 0) {
  selectItems.forEach((item) => {
    item.addEventListener("click", () => {
      const activeSelect = document.querySelector(".open.items");
      if (
        (item.classList.contains("memory__item") &&
          document.body.clientWidth > 768) ||
        (item.classList.contains("problem__item") &&
          document.body.clientWidth > 768) ||
        (item.classList.contains("equipment__item") &&
          document.body.clientWidth > 768)
      ) {
        console.log("768");
        chooseItem(item);
      } else if (
        document.body.clientWidth > 1024 &&
        item.classList.contains("condition__item")
      ) {
        console.log("1024");
        chooseItem(item);
      } else {
        if (activeSelect) {
          if (
            activeSelect.classList.contains("open") !=
            item.classList.contains("open")
          ) {
            closeSelect(activeSelect);
            function set() {
              openSelect(item);
            }
            setTimeout(set, 600);
          } else {
            console.log("open ");
            chooseItem(item);
          }
        } else {
          openSelect(item);
        }
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
