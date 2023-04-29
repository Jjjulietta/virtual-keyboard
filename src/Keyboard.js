export class Keyboard {
  constructor() {
    this.form = null;
    this.keyboard = null;
    this.row = null;
    this.span = null;
    this.key = null;
  }

  getForm() {
    this.form = document.createElement('div');
    this.form.classList.add('keyboard-form');
    return this.form;
  }

  getKeyboard() {
    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard-body');
    return this.keyboard;
  }

  getRow() {
    this.row = document.createElement('div');
    this.row.classList.add('row');
    return this.row;
  }

  getKey() {
    this.key = document.createElement('div');
    this.key.classList.add('key');
    return this.key;
  }

  getSpan(lang, codeValue, codeValueShift, keyTabs) {
    this.span = document.createElement('span');
    this.span.classList.add(lang);
    const spanDown = document.createElement('span');
    this.span.append(spanDown);
    spanDown.classList.add('caseDown');
    spanDown.textContent = `${codeValue}`;
    const spanUp = document.createElement('span');
    this.span.append(spanUp);
    spanUp.classList.add('caseUp');
    if (keyTabs.includes(`${codeValueShift}`)) {
      spanUp.textContent = `${codeValueShift}`;
    } else {
      spanUp.textContent = `${codeValueShift}`.toUpperCase();
    }
    const spanCaps = document.createElement('span');
    this.span.append(spanCaps);
    spanCaps.classList.add('caps');
    if (keyTabs.includes(`${codeValue}`)) {
      spanCaps.textContent = `${codeValue}`;
    } else {
      spanCaps.textContent = `${codeValue}`.toUpperCase();
    }
    const spanShift = document.createElement('span');
    this.span.append(spanShift);
    spanShift.classList.add('shiftCaps');
    spanShift.textContent = `${codeValueShift}`;

    return this.span;
  }

  getRowsNum(
    keyboardCode,
    keyboardKRus,
    keyboardK,
    keyboardShift,
    keyboardShiftR,
    numBase,
    numNext,
    keyTabs,
    objTabs,
  ) {
    const rowOne = this.getRow();
    for (let i = numBase; i < numNext; i += 1) {
      const keyOne = this.getKey();
      keyOne.classList.add(`${keyboardCode[i]}`);
      const spanRus = this.getSpan(
        'rus',
        keyboardKRus[i],
        keyboardShiftR[i],
        keyTabs,
        objTabs,
      );
      keyOne.append(spanRus);
      const spanEng = this.getSpan(
        'eng',
        keyboardK[i],
        keyboardShift[i],
        keyTabs,
        objTabs,
      );
      keyOne.append(spanEng);
      rowOne.append(keyOne);
    }
    this.getKeyboard().append(rowOne);
    return rowOne;
  }
}
