import Keyboard from './Keyboard.js';
import {
  keyTabs, codeTabs, objTabs, keyboardCode, keyboardK, keyboardKRus, keyboardShift, keyboardShiftR,
} from './data.js';

const body = document.querySelector('BODY');
let objLang = { lang: '', case: '' };

const numbers = [0, 14, 29, 42, 55, 64];
const keyb = new Keyboard();
const form = keyb.getForm();
body.prepend(form);

const title = document.createElement('h1');
title.classList.add('title');
title.innerHTML = 'VIRTUAL KEYBOARD';
form.append(title);
const textarea = document.createElement('textarea');
textarea.classList.add('display-textarea');
form.append(textarea);
textarea.setAttribute('rows', 5);
textarea.setAttribute('cols', 50);
const keyboard = keyb.getKeyboard();
form.append(keyboard);

for (let i = 0; i < numbers.length; i += 1) {
  if (i + 1 === numbers.length) {
    break;
  }
  const row = keyb.getRowsNum(
    keyboardCode,
    keyboardKRus,
    keyboardK,
    keyboardShift,
    keyboardShiftR,
    numbers[i],
    numbers[i + 1],
    keyTabs,
    objTabs,
  );
  keyboard.append(row);
}

const desc = document.createElement('p');
desc.innerHTML = 'The keyboard is created in the operating system Windows';
desc.classList.add('description');
form.append(desc);
const langKey = document.createElement('p');
langKey.innerHTML = 'language switching: left ctrl + alt';
langKey.classList.add('description');
form.append(langKey);

const divRus = keyboard.querySelectorAll('.rus');
const divEng = keyboard.querySelectorAll('.eng');
const spans = keyboard.querySelectorAll('span');
spans.forEach((item) => item.classList.add('hidden'));

/* =========check state on load============== */

function checkState() {
  spans.forEach((item) => item.classList.add('hidden'));
  if (objLang.lang === 'eng' && objLang.case === 'caseDown') {
    divEng.forEach((item) => item.classList.remove('hidden'));
    divEng.forEach((item) => item.querySelector('.caseDown').classList.remove('hidden'));
  } else if (objLang.lang === 'eng' && objLang.case === 'caps') {
    divEng.forEach((item) => item.classList.remove('hidden'));
    divEng.forEach((item) => item.querySelector('.caps').classList.remove('hidden'));
  } else if (objLang.lang === 'rus' && objLang.case === 'caseDown') {
    divRus.forEach((item) => item.classList.remove('hidden'));
    divRus.forEach((item) => item.querySelector('.caseDown').classList.remove('hidden'));
  } else if (objLang.lang === 'rus' && objLang.case === 'caps') {
    divRus.forEach((item) => item.classList.remove('hidden'));
    divRus.forEach((item) => item.querySelector('.caps').classList.remove('hidden'));
  } else if (objLang.lang === 'eng' && objLang.case === 'shiftCaps') {
    divEng.forEach((item) => item.classList.remove('hidden'));
    divEng.forEach((item) => item.querySelector('.shiftCaps').classList.remove('hidden'));
  } else if (objLang.lang === 'rus' && objLang.case === 'shiftCaps') {
    divRus.forEach((item) => item.classList.remove('hidden'));
    divRus.forEach((item) => item.querySelector('.shiftCaps').classList.remove('hidden'));
  } else if (objLang.lang === 'eng' && objLang.case === 'caseUp') {
    divEng.forEach((item) => item.classList.remove('hidden'));
    divEng.forEach((item) => item.querySelector('.caseUp').classList.remove('hidden'));
  } else if (objLang.lang === 'rus' && objLang.case === 'caseUp') {
    divRus.forEach((item) => item.classList.remove('hidden'));
    divRus.forEach((item) => item.querySelector('.caseUp').classList.remove('hidden'));
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
  if (!objLang.lang && !objLang.case) {
    objLang.lang = 'eng';
    objLang.case = 'caseDown';
    setLocalStorage();
  }
  checkState();
});

document.addEventListener('keydown', (event) => {
  textarea.setAttribute('autofocus', 'autofocus');
  // textarea.focus();
  const { code } = event;
  if (!codeTabs.includes(code)) {
    event.preventDefault();
    const keyItem = keyboard.querySelector(`.${code}`);
    const itemsKey = keyItem.querySelectorAll('span');
    itemsKey.forEach((item) => {
      if (!item.classList.contains('hidden') && !item.classList.contains('rus') && !item.classList.contains('eng')) {
        if (textarea.selectionStart !== textarea.value.length) {
          const text = item.textContent;
          textarea.setRangeText(`${text}`, textarea.selectionStart, textarea.selectionEnd, 'end');
        } else {
          textarea.value += item.textContent;
        }
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

  if (objLang.lang === 'rus') { objLang.lang = 'eng'; } else { objLang.lang = 'rus'; }

  setLocalStorage();
  checkState();
}

runOnKey(changeLang);

/* ----------------virtual keyboard------------------ */

/* ------------Backspace, Del, Enter Button Caps BackSpace----------------------- */

function pressBack() {
  textarea.focus();

  if (textarea.selectionStart === textarea.selectionEnd) {
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
}

function pressDel() {
  textarea.focus();
  if (textarea.selectionStart === textarea.selectionEnd) {
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

function pressTab() {
  textarea.focus();
  textarea.value += '\t';
}

function CapsPress() {
  if (objLang.lang === 'eng' && objLang.case === 'caps') {
    divEng.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
    divEng.forEach((item) => item.querySelector('.caseDown').classList.remove('hidden'));
    keyboard.querySelector('.CapsLock').classList.remove('active');
    objLang.case = 'caseDown';
    localStorage.clear();
    setLocalStorage();
  } else if (objLang.lang === 'eng' && objLang.case !== 'caps') {
    divEng.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
    divEng.forEach((item) => item.querySelector('.caps').classList.remove('hidden'));
    keyboard.querySelector('.CapsLock').classList.add('active');
    objLang.case = 'caps';
    localStorage.clear();
    setLocalStorage();
  } else if (objLang.lang === 'rus' && objLang.case === 'caps') {
    divRus.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
    divRus.forEach((item) => item.querySelector('.caseDown').classList.remove('hidden'));
    keyboard.querySelector('.CapsLock').classList.remove('active');
    objLang.case = 'caseDown';
    localStorage.clear();
    setLocalStorage();
  } else if (objLang.lang === 'rus' && objLang.case !== 'caps') {
    divRus.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
    divRus.forEach((item) => item.querySelector('.caps').classList.remove('hidden'));

    keyboard.querySelector('.CapsLock').classList.add('active');
    objLang.case = 'caps';
    localStorage.clear();
    setLocalStorage();
  }
}

function shiftClick() {
  if (objLang.lang === 'eng' && objLang.case === 'shiftCaps') {
    divEng.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
    divEng.forEach((item) => item.querySelector('.caps').classList.remove('hidden'));
    keyboard.querySelector('.ShiftLeft').classList.remove('active');
    objLang.case = 'caps';
    localStorage.clear();
    setLocalStorage();
  } else if (objLang.lang === 'eng' && objLang.case === 'caseUp') {
    divEng.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
    divEng.forEach((item) => item.querySelector('.caseDown').classList.remove('hidden'));
    keyboard.querySelector('.ShiftLeft').classList.remove('active');
    objLang.case = 'caseDown';
    localStorage.clear();
    setLocalStorage();
  } else if (objLang.lang === 'rus' && objLang.case === 'shiftCaps') {
    divRus.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
    divRus.forEach((item) => item.querySelector('.caps').classList.remove('hidden'));
    keyboard.querySelector('.ShiftLeft').classList.remove('active');
    objLang.case = 'caps';
    localStorage.clear();
    setLocalStorage();
  } else if (objLang.lang === 'rus' && objLang.case === 'caseUp') {
    divRus.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
    divRus.forEach((item) => item.querySelector('.caseDown').classList.remove('hidden'));
    keyboard.querySelector('.ShiftLeft').classList.remove('active');
    objLang.case = 'caseDown';
    localStorage.clear();
    setLocalStorage();
  }
  if (objLang.lang === 'eng' && objLang.case === 'caseDown') {
    divEng.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
    divEng.forEach((item) => item.querySelector('.caseUp').classList.remove('hidden'));
    keyboard.querySelector('.ShiftLeft').classList.add('active');
  } else if (objLang.lang === 'rus' && objLang.case === 'caseDown') {
    divRus.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
    divRus.forEach((item) => item.querySelector('.caseUp').classList.remove('hidden'));
    keyboard.querySelector('.ShiftLeft').classList.add('active');
  }
}
/* --------------SHIFT & ALT---------------------------*/

function shiftPress() {
  if (objLang.lang === 'eng' && objLang.case === 'caps') {
    divEng.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
    divEng.forEach((item) => item.querySelector('.shiftCaps').classList.remove('hidden'));
    keyboard.querySelector('.ShiftLeft').classList.add('active');
    objLang.case = 'shiftCaps';
    localStorage.clear();
    setLocalStorage();
  } else if (objLang.lang === 'eng' && objLang.case === 'caseDown') {
    divEng.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
    divEng.forEach((item) => item.querySelector('.caseUp').classList.remove('hidden'));
    keyboard.querySelector('.ShiftLeft').classList.add('active');
    objLang.case = 'caseUp';
    localStorage.clear();
    setLocalStorage();
  } else if (objLang.lang === 'rus' && objLang.case === '.caps') {
    divRus.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
    divRus.forEach((item) => item.querySelector('.shiftCaps').classList.remove('hidden'));
    keyboard.querySelector('.ShiftLeft').classList.add('active');
    objLang.case = 'shiftCaps';
    localStorage.clear();
    setLocalStorage();
  } else if (objLang.lang === 'rus' && objLang.case === 'caseDown') {
    divRus.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
    divRus.forEach((item) => item.querySelector('.caseUp').classList.remove('hidden'));
    keyboard.querySelector('.ShiftLeft').classList.add('active');
    objLang.case = 'caseUp';
    localStorage.clear();
    setLocalStorage();
  }
}

let flag = 0;
function pressShiftAlt(func) {
  document.addEventListener('mousedown', (event) => {
    const { target } = event;
    if (flag === 0 && target.closest('.ShiftLeft') && event.button === 0) {
      flag = 1;
    }
    if (flag === 1 && target.closest('.AltLeft')) {
      func();
      flag = 0;
    }
  });
}

pressShiftAlt(shiftPress);

document.addEventListener('mousedown', (event) => {
  const { target } = event;
  if (target.textContent === 'Shift') {
    if (objLang.lang === 'eng' && objLang.case === 'caseDown') {
      divEng.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
      divEng.forEach((item) => item.querySelector('.caseUp').classList.remove('hidden'));
      keyboard.querySelector('.ShiftLeft').classList.add('active');
    } else if (objLang.lang === 'eng' && objLang.case === 'caps') {
      divEng.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
      divEng.forEach((item) => item.querySelector('.shiftCaps').classList.remove('hidden'));
      keyboard.querySelector('.ShiftLeft').classList.add('active');
    } else if (objLang.lang === 'rus' && objLang.case === 'caseDown') {
      divRus.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
      divRus.forEach((item) => item.querySelector('.caseUp').classList.remove('hidden'));
      keyboard.querySelector('.ShiftLeft').classList.add('active');
    } else if (objLang.lang === 'rus' && objLang.case === 'caps') {
      divRus.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
      divRus.forEach((item) => item.querySelector('.shiftCaps').classList.remove('hidden'));
      keyboard.querySelector('.ShiftLeft').classList.add('active');
    }
  }
});

document.addEventListener('mouseup', (event) => {
  const { target } = event;
  if (target.textContent === 'Shift') {
    if (objLang.lang === 'eng' && objLang.case === 'caseDown') {
      divEng.forEach((item) => item.querySelector('.caseUp').classList.add('hidden'));
      divEng.forEach((item) => item.querySelector('.caseDown').classList.remove('hidden'));
      keyboard.querySelector('.ShiftLeft').classList.remove('active');
    } else if (objLang.lang === 'eng' && objLang.case === 'caps') {
      divEng.forEach((item) => item.querySelector('.caps').classList.remove('hidden'));
      divEng.forEach((item) => item.querySelector('.shiftCaps').classList.add('hidden'));
      keyboard.querySelector('.ShiftLeft').classList.remove('active');
    } else if (objLang.lang === 'rus' && objLang.case === 'caseDown') {
      divRus.forEach((item) => item.querySelector('.caseUp').classList.add('hidden'));
      divRus.forEach((item) => item.querySelector('.caseDown').classList.remove('hidden'));
      keyboard.querySelector('.ShiftLeft').classList.remove('active');
    } else if (objLang.lang === 'rus' && objLang.case === 'caps') {
      divRus.forEach((item) => item.querySelector('.caps').classList.remove('hidden'));
      divRus.forEach((item) => item.querySelector('.shiftCaps').classList.add('hidden'));
      keyboard.querySelector('.ShiftLeft').classList.remove('active');
    }
  }
});

keyboard.addEventListener('click', (event) => {
  textarea.setAttribute('autofocus', 'autofocus');
  const values = Object.values(objTabs);
  const { target } = event;
  if (target.classList.contains('hidden')) {
    return;
  }
  if (!target.closest('span')) {
    return;
  }
  if (target.classList.contains('rus') || target.classList.contains('eng')) {
    return;
  }
  if (!values.includes(target.textContent)) {
    textarea.focus();
    if (textarea.selectionStart !== textarea.value.length) {
      const text = target.textContent;
      textarea.setRangeText(`${text}`, textarea.selectionStart, textarea.selectionEnd, 'end');
    } else {
      textarea.value += `${target.textContent}`;
    }
  } else if (target.textContent === 'Backspace') {
    pressBack();
  } else if (target.textContent === 'Del') {
    pressDel();
  } else if (target.textContent === 'Enter') {
    pressEnter();
  } else if (target.textContent === 'CapsLock') {
    CapsPress();
  } else if (target.textContent === 'Shift') {
    shiftClick();
  } else if (target.textContent === 'Tab') {
    pressTab();
  }
});

/* -----------EVENT KEYBOARD-------------------------- */

document.addEventListener('keydown', (event) => {
  getLocalStorage();
  if (event.code === 'CapsLock') {
    if (objLang.lang === 'eng' && objLang.case === 'caps') {
      divEng.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
      divEng.forEach((item) => item.querySelector('.caseDown').classList.remove('hidden'));
      keyboard.querySelector('.CapsLock').classList.remove('active');
      objLang.case = 'caseDown';
      localStorage.clear();
      setLocalStorage();
    } else if (objLang.lang === 'eng' && objLang.case !== 'caps') {
      divEng.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
      divEng.forEach((item) => item.querySelector('.caps').classList.remove('hidden'));
      keyboard.querySelector('.CapsLock').classList.add('active');
      objLang.case = 'caps';
      localStorage.clear();
      setLocalStorage();
    } else if (objLang.lang === 'rus' && objLang.case === 'caps') {
      divRus.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
      divRus.forEach((item) => item.querySelector('.caseDown').classList.remove('hidden'));
      keyboard.querySelector('.CapsLock').classList.remove('active');
      objLang.case = 'caseDown';
      localStorage.clear();
      setLocalStorage();
    } else if (objLang.lang === 'rus' && objLang.case !== 'caps') {
      divRus.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
      divRus.forEach((item) => item.querySelector('.caps').classList.remove('hidden'));

      keyboard.querySelector('.CapsLock').classList.add('active');
      objLang.case = 'caps';
      localStorage.clear();
      setLocalStorage();
    }
  }
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    if (objLang.lang === 'eng' && objLang.case === 'caps') {
      divEng.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
      divEng.forEach((item) => item.querySelector('.shiftCaps').classList.remove('hidden'));
    }
    if (objLang.lang === 'eng' && objLang.case !== 'caps') {
      divEng.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
      divEng.forEach((item) => item.querySelector('.caseUp').classList.remove('hidden'));
    }

    if (objLang.lang === 'rus' && objLang.case === 'caps') {
      divRus.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
      divRus.forEach((item) => item.querySelector('.shiftCaps').classList.remove('hidden'));
    }

    if (objLang.lang === 'rus' && objLang.case !== 'caps') {
      divRus.forEach((item) => item.querySelectorAll('span').forEach((value) => value.classList.add('hidden')));
      divRus.forEach((item) => item.querySelector('.caseUp').classList.remove('hidden'));
    }
  }
  if (event.code !== 'CapsLock') {
    keyboard.querySelector(`.${event.code}`).classList.add('active');
  }
  if (event.code === 'Backspace') {
    textarea.focus();
  }
  if (event.code === 'Tab') {
    event.preventDefault();
    textarea.focus();
    textarea.value += '\t';
  }
});

document.addEventListener('keyup', (event) => {
  if (document.querySelector(`.${event.code}`).classList.contains('active') && event.code !== 'CapsLock') {
    document.querySelector(`.${event.code}`).classList.remove('active');
  }

  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    if (objLang.lang === 'eng' && objLang.case === 'caps') {
      divEng.forEach((item) => item.querySelector('.caps').classList.remove('hidden'));
      divEng.forEach((item) => item.querySelector('.shiftCaps').classList.add('hidden'));
    }
    if (objLang.lang === 'eng' && objLang.case !== 'caps') {
      divEng.forEach((item) => item.querySelector('.caseDown').classList.remove('hidden'));
      divEng.forEach((item) => item.querySelector('.caseUp').classList.add('hidden'));
    }
    if (objLang.lang === 'rus' && objLang.case === 'caps') {
      divRus.forEach((item) => item.querySelector('.caps').classList.remove('hidden'));
      divRus.forEach((item) => item.querySelector('.shiftCaps').classList.add('hidden'));
    }
    if (objLang.lang === 'rus' && objLang.case !== 'caps') {
      divRus.forEach((item) => item.querySelector('.caseDown').classList.remove('hidden'));
      divRus.forEach((item) => item.querySelector('.caseUp').classList.add('hidden'));
    }
  }
});
