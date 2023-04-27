import { Keyboard } from './Keyboard.js';
import {
 keyTabs, codeTabs, objTabs, keyboardCode, keyboardKey, keyboardKeyRus, keyboardKeyShift, keyboardKeyShiftRus, 
} from './data.js';

const body = document.querySelector('BODY');
let objLang = { lang: '', case: '' };

const numbers = [0, 14, 29, 42, 55, 64];
const keyb = new Keyboard();
console.log();
const form = keyb.getForm();
console.log(form);
body.prepend(form);

const title = document.createElement('h1');
title.classList.add('title');
title.innerHTML = 'ВИРТУАЛЬНАЯ КЛАВИАТУРА';
form.append(title);
const textarea = document.createElement('textarea');
textarea.classList.add('display-textarea');
form.append(textarea);
textarea.setAttribute('rows', 5);
textarea.setAttribute('cols', 50);
console.log(textarea.getAttribute('rows'));

const keyboard = keyb.getKeyboard();
form.append(keyboard);

for (let i = 0; i < numbers.length; i++) {
  if (i + 1 == numbers.length) {
    break;
  }
  const row = keyb.getRowsNum(
    keyboardCode,
    keyboardKeyRus,
    keyboardKey,
    keyboardKeyShift,
    keyboardKeyShiftRus,
    numbers[i],
    numbers[i + 1],
    keyTabs,
    objTabs,
  );
  keyboard.append(row);
}

const capsClass = document.querySelectorAll('.caps');
const caseDownClass = Array.from(document.querySelectorAll('.caseDown'));
const shiftClass = Array.from(document.querySelectorAll('.shiftCaps'));
const divKey = document.querySelectorAll('.key');
const divRus = keyboard.querySelectorAll('.rus');
const divEng = keyboard.querySelectorAll('.eng');
const spans = keyboard.querySelectorAll('span');
const keys = document.querySelectorAll('.key');

spans.forEach((item) => item.classList.add('hidden'));

function checkState() {
  spans.forEach((item) => item.classList.add('hidden'));
  console.log(objLang.lang);
  console.log(objLang.case);
  if (objLang.lang == 'eng' && objLang.case == 'caseDown') {
    divEng.forEach((item) => item.classList.remove('hidden'));
    divEng.forEach((item) => item.querySelector('.caseDown').classList.remove('hidden'));
  } else if (objLang.lang == 'eng' && objLang.case == 'caps') {
    divEng.forEach((item) => item.classList.remove('hidden'));
    divEng.forEach((item) => item.querySelector('.caps').classList.remove('hidden'));
  } else if (objLang.lang == 'rus' && objLang.case == 'caseDown') {
    divRus.forEach((item) => item.classList.remove('hidden'));
    divRus.forEach((item) => item.querySelector('.caseDown').classList.remove('hidden'));
  } else if (objLang.lang == 'rus' && objLang.case == 'caps') {
    divRus.forEach((item) => item.classList.remove('hidden'));
    divRus.forEach((item) => item.querySelector('.caps').classList.remove('hidden'));
  } else if (objLang.lang == 'eng' && objLang.case == 'shiftCaps') {
    divEng.forEach((item) => item.classList.remove('hidden'));
    divEng.forEach((item) => item.querySelector('.shiftCaps').classList.remove('hidden'));
  } else if (objLang.lang == 'rus' && objLang.case == 'shiftCaps') {
    divRus.forEach((item) => item.classList.remove('hidden'));
    divRus.forEach((item) => item.querySelector('.shiftCaps').classList.remove('hidden'));
  }
}

function setLocalStorage() {
  localStorage.setItem('objLang', JSON.stringify(objLang));
}

function getLocalStorage() {
  if (localStorage.getItem('objLang')) {
    objLang = JSON.parse(localStorage.getItem('objLang'));
  }
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', () => {
  getLocalStorage();
  console.log(objLang);
  if (!objLang.lang && !objLang.case) {
    objLang.lang = 'eng';
    objLang.case = 'caseDown';
    setLocalStorage();
  }
  checkState();
});

document.addEventListener('keydown', (event) => {
  textarea.setAttribute('autofocus', 'autofocus');

    const code = event.code;
    if (!codeTabs.includes(code)) {
   event.preventDefault();
     const keyItem = keyboard.querySelector(`.${code}`);
     const itemsKey = keyItem.querySelectorAll('span');
     console.log(itemsKey);
     itemsKey.forEach((item) => {
      if (!item.classList.contains('hidden') && !item.classList.contains('rus') && !item.classList.contains('eng')) {
          textarea.value += item.textContent;
          
        console.log(item);
      } 
     });
    } 
  });

  function runOnKey(func) {
    document.addEventListener('keydown', (event) => {
 if (event.ctrlKey && event.altKey) {
  func();
 }
    });
    document.addEventListener('keyup', (event) => {
   event.preventDefault();
    });
  }
  function changeLang() {
   getLocalStorage();
   
   if (objLang.lang == 'rus') { objLang.lang = 'eng'; } else { objLang.lang = 'rus'; }
   
   setLocalStorage();
   checkState();
 }
 
 runOnKey(changeLang);
