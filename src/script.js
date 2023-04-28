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

/* =========check state on load============== */

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

    let code = event.code;
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

  /* ---------------SHANGE LANGUAGES--------------------- */

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

 /* ----------------virtual keyboard------------------ */

 /* ------------Backspace, Del, Enter Button ----------------------- */

 function pressBack() {
  textarea.focus();

  if (textarea.selectionStart == textarea.selectionEnd) {
    textarea.setRangeText(
      '',
      textarea.selectionStart - 1,
      textarea.selectionEnd,
    );
  } else {
   textarea.setRangeText(
      '',
    );
  }
  // {textarea.value.slice(selectionStart, selectionEnd);
  console.log(textarea.value);
}

function pressDel() {
  textarea.focus();

  console.log(textarea.selectionStart);
  console.log(textarea.selectionEnd);
  if (textarea.selectionStart == textarea.selectionEnd) {
    console.log(textarea.value);
    textarea.setRangeText(
      '',
      textarea.selectionStart,
      textarea.selectionEnd + 1,
    );
  } else {
    textarea.setRangeText('');
  }
}

function pressEnter() {
  textarea.focus();
  textarea.value += '\n';
}

keyboard.addEventListener('click', (event) => {
  // textarea.setAttribute('autofocus', 'autofocus')
  const values = Object.values(objTabs);
  console.log(values);
  const { target } = event;
  console.log(target);
  if (target.classList.contains('hidden')) {
    return;
  }
  if (!target.closest('span')) {
    return;
  }
  if (!values.includes(target.textContent)) {
    console.log(target);

    textarea.value += `${target.textContent}`;
  } else if (target.textContent == 'Backspace') {
      pressBack();
  } else if (target.textContent == 'Del') {
    pressDel();
  } else if (target.textContent == 'Enter') {
    pressEnter();
  }
});

document.addEventListener('keydown', (event) => {
  getLocalStorage();
 console.log(event.code);
 console.log(objLang.lang);
 console.log(objLang.case);
 if (event.code == 'CapsLock') {
   console.log(event);
   if (objLang.lang == 'eng' && objLang.case == 'caps') {
    // divEng.forEach(item => console.log(item.querySelector('span')))
     divEng.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
     divEng.forEach((item) => item.querySelector('.caseDown').classList.remove('hidden'));
     keyboard.querySelector('.CapsLock').classList.remove('active');
     objLang.case = 'caseDown';
     localStorage.clear();
     setLocalStorage();
   } else if (objLang.lang == 'eng' && objLang.case !== 'caps') {
     divEng.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
     divEng.forEach((item) => item.querySelector('.caps').classList.remove('hidden'));
   keyboard.querySelector('.CapsLock').classList.add('active');
   objLang.case = 'caps';
   localStorage.clear();
   setLocalStorage();
   } else if (objLang.lang == 'rus' && objLang.case == 'caps') {
     divRus.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
     divRus.forEach((item) => item.querySelector('.caseDown').classList.remove('hidden'));
     keyboard.querySelector('.CapsLock').classList.remove('active');
     objLang.case = 'caseDown';
     localStorage.clear();
     setLocalStorage();
   } else if (objLang.lang == 'rus' && objLang.case !== 'caps') {
     divRus.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
     divRus.forEach((item) => item.querySelector('.caps').classList.remove('hidden'));
  
   keyboard.querySelector('.CapsLock').classList.add('active');
   objLang.case = 'caps';
   localStorage.clear();
   setLocalStorage();
   }
       }
 if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') {
   console.log(event);
   if (objLang.lang == 'eng' && objLang.case == 'caps') {
     divEng.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
     divEng.forEach((item) => item.querySelector('.shiftCaps').classList.remove('hidden'));
   }
   if (objLang.lang == 'eng' && objLang.case != 'caps') {
    divEng.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
    divEng.forEach((item) => item.querySelector('.caseUp').classList.remove('hidden'));
  }
   
   if (objLang.lang == 'rus' && objLang.case == 'caps') {
     divRus.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
     divRus.forEach((item) => item.querySelector('.shiftCaps').classList.remove('hidden'));
   }

   if (objLang.lang == 'rus' && objLang.case != 'caps') {
    divRus.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
    divRus.forEach((item) => item.querySelector('.caseUp').classList.remove('hidden'));
  }
 }
 if (event.code !== 'CapsLock') {
 keyboard.querySelector(`.${event.code}`).classList.add('active');
 }
 if (event.code == 'Backspace') {
   textarea.focus();
 }
 });

 document.addEventListener('keyup', (event) => {
   console.log(event.code);
   if (document.querySelector(`.${event.code}`).classList.contains('active') && event.code !== 'CapsLock') {
     document.querySelector(`.${event.code}`).classList.remove('active');
   }
   
   if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') {
     console.log(event);
     if (objLang.lang == 'eng' && objLang.case == 'caps') {
       divEng.forEach((item) => item.querySelector('.caps').classList.remove('hidden'));
       divEng.forEach((item) => item.querySelector('.shiftCaps').classList.add('hidden'));
     }
     if (objLang.lang == 'eng' && objLang.case != 'caps') {
      divEng.forEach((item) => item.querySelector('.caseDown').classList.remove('hidden'));
      divEng.forEach((item) => item.querySelector('.caseUp').classList.add('hidden'));
    }
     if (objLang.lang == 'rus' && objLang.case == 'caps') {
       divRus.forEach((item) => item.querySelector('.caps').classList.remove('hidden'));
       divRus.forEach((item) => item.querySelector('.shiftCaps').classList.add('hidden'));
     }
     if (objLang.lang == 'rus' && objLang.case != 'caps') {
      divRus.forEach((item) => item.querySelector('.caseDown').classList.remove('hidden'));
      divRus.forEach((item) => item.querySelector('.caseUp').classList.add('hidden'));
    }
     }
   });
