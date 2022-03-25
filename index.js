const cardElement = document.getElementsByClassName("credit-card")[0];
const inputCCNumber = document.getElementsByClassName("cc-number")[0];
const inputCCName = document.getElementsByClassName("cc-name")[0];
const cardName = document.getElementsByClassName("holder")[0];
const inputCCValidDate = document.getElementsByClassName('cc-valid-date')[0];
const cardDates = document.getElementsByClassName('expiry')[0];
const maskChar = "&#9679;";
const initialCardDates = `${maskChar}${maskChar}/${maskChar}${maskChar}`;
const initialQuartet = `${maskChar}${maskChar}${maskChar}${maskChar}`;
const ccNumber = `${initialQuartet} ${initialQuartet} ${initialQuartet} ${initialQuartet}`;

const ccNumberChange = (e) => {
  const { target, keyCode } = e;
  const { name, value } = target;
  const stringLen = value.length;
  const numberRx =
    /^((4\d{3})|(5[1-5]\d{2})|(6011)|(34\d{1})|(37\d{1}))-?\s?\d{4}-?\s?\d{4}-?\s?\d{4}|3[4,7][\d\s-]{15}$/;
  const cardQuartet = document.getElementsByClassName("hidden-digits");
  const ccNumberArr = ccNumber.split(" ");
  const { classList } = cardElement;

  if (
    (stringLen === 4 || stringLen === 9 || stringLen === 14) &&
    keyCode !== 8
  ) {
    inputCCNumber.value = `${value} `;
  }

  const ccNumberValueArr = value.split(" ");

  for (
    let i = 0, cardQuartetLen = cardQuartet.length;
    i < cardQuartetLen;
    ++i
  ) {
    if (ccNumberValueArr[i]) {
      const ccQuartet = ccNumberValueArr[i];
      const ccQuartetArr = ccQuartet.split("");

      for (let j = 0; j < 4; ++j) {
        if (!ccQuartetArr[j]) {
          ccQuartetArr.push(maskChar);
        }
      }

      cardQuartet[i].innerHTML = ccQuartetArr.join("");
    } else {
      cardQuartet[i].innerHTML = ccNumberArr[i];
    }
  }

  const ccType = getCardType(value.replace(/ /g, ""));

  logo.src = logos[ccType];

  for (const key in logos) {
    if (logos.hasOwnProperty(key)) {
      classList.remove(key);
    }
  }

  classList.add(ccType);
};

const ccValidDateChange = e => {
    const { target, keyCode } = e;
    const { value } = target;
    const valueLen = value.length;
    const valueArr = value.split('/');
  
    if (valueLen === 2 && keyCode !== 8 && keyCode !== 111) {
      inputCCValidDate.value = `${ value }/`;
    }
    // initialCardDates
    const cardDatesArr = initialCardDates.split('/');
    
    for(let i = 0; i < 2; ++i) {
      if (valueArr[i]) {
        for(let j = 0; j < 2; ++j) {
          const currentSegmentArr = valueArr[i].split('');
          
          if (!currentSegmentArr[j]) {
            currentSegmentArr.push(maskChar);
          }
          valueArr[i] = currentSegmentArr.join('');
        }
      } else {
        valueArr[i] = `${ maskChar }${ maskChar }`;
      }
    }
    
    cardDates.innerHTML = `${ valueArr[0] }/${ valueArr[1] }`;
  }

ccToggleDisable = (e) => {
  const { target } = e;
  const ccConcept = target.getAttribute("cc-concept");
  const ccSide = target.getAttribute("cc-side");
  const ccElement = document.getElementsByClassName(ccConcept)[0];

  ccElement.classList.toggle("disabled");

  if (ccSide === "back") {
    cardElement.classList.add("flipped");
  } else {
    cardElement.classList.remove("flipped");
  }
};

const ccNameChange = (e) => {
  const { target } = e;
  const { value } = target;
  const nameText = value.length === 0 ? "Your name here" : value;

  cardName.innerHTML = nameText.toUpperCase();
};

// Card Number
inputCCNumber.addEventListener("keyup", ccNumberChange);
// inputCCNumber.addEventListener("focus", ccToggleDisable);
// inputCCNumber.addEventListener("blur", ccToggleDisable);

// Card Name
inputCCName.addEventListener('input', ccNameChange);
// inputCCName.addEventListener('focus', ccToggleDisable);
// inputCCName.addEventListener('blur', ccToggleDisable);

// Date
inputCCValidDate.addEventListener('keyup', ccValidDateChange);
// inputCCValidDate.addEventListener('focus', ccToggleDisable);
// inputCCValidDate.addEventListener('blur', ccToggleDisable);
