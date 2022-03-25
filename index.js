const cardElement = document.getElementsByClassName("credit-card")[0];
const inputCCNumber = document.getElementsByClassName("cc-number")[0];
const inputCCName = document.getElementsByClassName("cc-name")[0];
const cardName = document.getElementsByClassName("holder")[0];
const inputCCValidDate = document.getElementsByClassName("cc-valid-date")[0];
const cardDates = document.getElementsByClassName("expiry")[0];
const logo = document.getElementsByClassName("logo")[0];
const maskChar = "&#9679;";
const initialCardDates = `${maskChar}${maskChar}/${maskChar}${maskChar}`;
const initialQuartet = `${maskChar}${maskChar}${maskChar}${maskChar}`;
const ccNumber = `${initialQuartet} ${initialQuartet} ${initialQuartet} ${initialQuartet}`;

const logos = {
  vs: "https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png",
  mc: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
  ax: "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg",
};

const getCardType = (number) => {
  // Visa
  const visaRx = new RegExp("^4[0-9]{0,15}$");
  // MasterCard
  const mastercardRx = new RegExp("^5$|^5[1-5][0-9]{0,14}$");
  // American Express
  const amexRx = new RegExp("^3$|^3[47][0-9]{0,13}$");
  // Diners Club
  const dinersRx = new RegExp(
    "^3$|^3[068]$|^3(?:0[0-5]|[68][0-9])[0-9]{0,11}$"
  );
  //Discover
  const discoverRx = new RegExp(
    "^6$|^6[05]$|^601[1]?$|^65[0-9][0-9]?$|^6(?:011|5[0-9]{2})[0-9]{0,12}$"
  );
  //JCB
  const jcbRx = new RegExp(
    "^2[1]?$|^21[3]?$|^1[8]?$|^18[0]?$|^(?:2131|1800)[0-9]{0,11}$|^3[5]?$|^35[0-9]{0,14}$"
  );

  if (visaRx.test(number)) {
    return "vs";
  }
  if (mastercardRx.test(number)) {
    return "mc";
  }
  if (amexRx.test(number)) {
    return "ax";
  }
  if (dinersRx.test(number)) {
    return "dn";
  }
  if (discoverRx.test(number)) {
    return "dc";
  }
  if (jcbRx.test(number)) {
    return "jc";
  }
};

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

  document.getElementById("cardLogo").src = logo.src;

  logo.src = logos[ccType];
  

  for (const key in logos) {
    if (logos.hasOwnProperty(key)) {
      classList.remove(key);
    }
  }

  classList.add(ccType);
};

const ccValidDateChange = (e) => {
  const { target, keyCode } = e;
  const { value } = target;
  const valueLen = value.length;
  const valueArr = value.split("/");

  if (valueLen === 2 && keyCode !== 8 && keyCode !== 111) {
    inputCCValidDate.value = `${value}/`;
  }
  // initialCardDates
  const cardDatesArr = initialCardDates.split("/");

  for (let i = 0; i < 2; ++i) {
    if (valueArr[i]) {
      for (let j = 0; j < 2; ++j) {
        const currentSegmentArr = valueArr[i].split("");

        if (!currentSegmentArr[j]) {
          currentSegmentArr.push(maskChar);
        }
        valueArr[i] = currentSegmentArr.join("");
      }
    } else {
      valueArr[i] = `${maskChar}${maskChar}`;
    }
  }

  cardDates.innerHTML = `${valueArr[0]}/${valueArr[1]}`;
};

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
inputCCName.addEventListener("input", ccNameChange);
// inputCCName.addEventListener('focus', ccToggleDisable);
// inputCCName.addEventListener('blur', ccToggleDisable);

// Date
inputCCValidDate.addEventListener("keyup", ccValidDateChange);
// inputCCValidDate.addEventListener('focus', ccToggleDisable);
// inputCCValidDate.addEventListener('blur', ccToggleDisable);
