const buttonContact = document.querySelector(".header__menu-contact");
const contact = document.querySelector(".header__contacts");
const buttonMenu = document.querySelector(".header__menu-burger");
const menu = document.querySelector(".header__menu");

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");

console.log(popupLinks);

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", (e) => {
      const popupName = popupLink.getAttribute("data-p");
      const currentPopup = document.getElementById(popupName);
      console.log(currentPopup);
      popupOpen(currentPopup);
    });
  }
}
const popupCloseIcon = document.querySelectorAll(".close-popup");
console.log(popupCloseIcon);
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    // console.log(popupCloseIcon[index]);
    const elem = popupCloseIcon[index];
    elem.addEventListener("click", (e) => {
      popupClose(elem.closest(".popup"));
      // console.log(elem);
    });
  }
}
// const sendButton = document.querySelectorAll(".send");
// console.log(sendButton);
// if (sendButton.length>0){
//   for(let index=0;index<sendButton.length;index++){
// const popup =
//   }
// }

function popupOpen(currentPopup) {
  if (currentPopup) {
    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      popupClose(popupActive);
    } else {
      // bodyLock();
    }
    currentPopup.classList.add("open");
  }
}

function popupClose(popupActive) {
  console.log(popupActive);
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
