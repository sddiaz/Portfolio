//#region Variables
// Main Section 
const sliderValue = document.getElementById("sliderValue"); 
const sliderInput = document.getElementById("sliderInput"); 
const strengthPercent = document.getElementById("percentage");
// Grab ASCII code range for every selection 
const upperCaseCodes = getAvailableCharacters(65, 90); 
const lowerCaseCodes = getAvailableCharacters(97, 122); 
const symbolCodes1 = getAvailableCharacters(33, 47);
const symbolCodes2 = getAvailableCharacters(58, 64); 
const symbolCodes3 = getAvailableCharacters(91, 96);
const symbolCodes4 = getAvailableCharacters(123, 126);
const symbolCodesFirstHalf = symbolCodes1.concat(symbolCodes2);
const symbolCodesSecondHalf = symbolCodes3.concat(symbolCodes4);
const symbolCodes = symbolCodesFirstHalf.concat(symbolCodesSecondHalf);
const numberCodes = getAvailableCharacters(48, 57); 
var possibleCharacters;
let chance = document.getElementById("chance");
let myExponent = document.getElementById('myExponent');
// Update Slider Value on Slide
  
sliderInput.oninput = (() => {
  let value = sliderInput.value; 
  sliderValue.textContent = value; 
  sliderValue.style.left = (value/2) + "%"
});


// Strength Checker Variables 
let progressCircle = document.querySelector('.progress');
let radius = progressCircle.r.baseVal.value; 
let circumference = Math.PI * 2 * radius; 
progressCircle.style.strokeDasharray = circumference;
let count = 1;
let includeUppercase = upperCase.checked; 
let includeLowercase = lowerCase.checked; 
let includeSymbols = symbols.checked; 
let includeNumbers = numbers.checked; 
let includedSettings = 0; 
let max = 0;
let percentage = 0;
// 0 - 100

function setProgress(percent) {
  progressCircle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
}
//#region Second Section
const carousel = document.querySelector('.carousel');
const carouselSlider = document.querySelector('.carouselSlider');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
var direction; 
prev.addEventListener('click', function() {
  if (direction == -1) {
    carouselSlider.appendChild(carouselSlider.firstElementChild);  
    direction = 1; 
  }
  direction = 1; 
  carousel.style.justifyContent = 'flex-end';
  carouselSlider.style.transform = 'translate(14.2857142857%)';
})

next.addEventListener('click', function() {
  if (direction == 1) {
    carouselSlider.prepend(carouselSlider.lastElementChild);  
    direction = 1; 
  }
  direction = -1; 
  carousel.style.justifyContent = 'flex-start';
  carouselSlider.style.transform = 'translate(-14.2857142857%)';
})


carouselSlider.addEventListener('transitionend', function() {
  if (direction == -1) {
    carouselSlider.appendChild(carouselSlider.firstElementChild);  
  }
  else if (direction == 1) {
    carouselSlider.prepend(carouselSlider.lastElementChild);  
  }
  carouselSlider.style.transition = 'none'; 
  carouselSlider.style.transform = 'translate(0)'; 
  setTimeout(function() {
    carouselSlider.style.transition = '0.5s'; 
  })
})
//#endregion 

//#region Buttons

function copyToClipboard() {   
  // Grab our element
  var passwordText = document.getElementById("passwordBox");
  // Select the text in element
  passwordText.select();
  passwordText.setSelectionRange(0, 99999); 
   // Copy the text top clipboard
  navigator.clipboard.writeText(passwordText.value);
}
function reversePass() {
  var passwordText = document.getElementById("passwordBox").value;
  var splitString = passwordText.split(""); 
  var reversedString = splitString.reverse(); 
  var joinedString = reversedString.join(""); 
  passwordBox.value = joinedString;

}
function generateClick() {
  // Grab all necessary checkboxes & form variables 
  var upperCase = document.getElementById("upperCase"); 
  var lowerCase = document.getElementById("lowerCase"); 
  var symbols = document.getElementById("symbols"); 
  var numbers = document.getElementById("numbers"); 

  const includeUppercase = upperCase.checked; 
  const includeLowercase = lowerCase.checked; 
  const includeSymbols = symbols.checked; 
  const includeNumbers = numbers.checked; 
  const characterAmount = sliderInput.value; 
  if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
    alert('You need at least one setting switch enabled.')
  }
  else {
    // generate 
    possibleCharacters = getPossibleChars(characterAmount, includeUppercase, includeLowercase, 
    includeSymbols, includeNumbers);
    const numberOfGuesses = Math.pow(possibleCharacters, characterAmount);
    // display
    const password = generatePass(characterAmount, includeUppercase, includeLowercase, 
      includeSymbols, includeNumbers);
    const passwordBox = document.getElementById("passwordBox");
    passwordBox.value = password;
  }
}

//#endregion

//#region Password Generation
function generatePass(characterAmount, includeUppercase, includeLowercase, 
  includeSymbols, includeNumbers) {
    let charCodes = []; 
    // For Strength Checker
    let includedSettings = 0; 
    if (includeUppercase) {
      charCodes = charCodes.concat(upperCaseCodes);
      includedSettings++; 
    }
    if (includeLowercase) {
      charCodes = charCodes.concat(lowerCaseCodes);
      includedSettings++; 
    }
    if (includeSymbols) {
      charCodes = charCodes.concat(symbolCodes);
      includedSettings++; 
    }
    if (includeNumbers) {
      charCodes = charCodes.concat(numberCodes);
      includedSettings++; 
    }
    possibleCharacters = charCodes.length;
    // Fill out "strength checker" circle
    let percent = possibleCharacters; 
    if (percent > 100 && percent < 140) {
      percent = 90; 
    }
    else if (percent > 140) {
      percent = 100;
    }
    if (sliderInput.value > 30) {
      percent = 100;
    }
    strengthPercent.textContent = percent + "%"; 
    setProgress(percent);

    const passwordCharacters = []; 
    for (let i = 0; i < characterAmount; i++) {
      const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
      passwordCharacters.push(String.fromCharCode(characterCode));
    }
    var myPassword = passwordCharacters.join('');


    // Chance of guessing = 1 / (possible characters ^ string length)
    // Get all unique characters. 
    var uniqueCharacters = new Set();
    for (let i = 0; i < myPassword.length; i++) {
      if (!uniqueCharacters.has(myPassword[i])) {
        uniqueCharacters.add(myPassword[i]); 
      }
    }
    chance.textContent = uniqueCharacters.size;
    myExponent.textContent = sliderInput.value;
    ///
    ///
    return myPassword;
}
function getAvailableCharacters(low, high) {
  const array = []; 
  for (let i = low; i<= high; i++) {
    array.push(i); 
  }
  return array; 
}

function checkInputs(inputBox) {
  // Grab the element we clicked and the checked status of all elements. 
  var element = document.getElementById(inputBox.id);
  const includeUppercase = upperCase.checked; 
  const includeLowercase = lowerCase.checked; 
  const includeSymbols = symbols.checked; 
  const includeNumbers = numbers.checked; 
  // We need at least one clicked element at all times
  var allElements = 4; 
  if (!includeUppercase) {
    allElements--; 
  }
  if (!includeLowercase) {
    allElements--; 
  }
  if (!includeSymbols) {
    allElements--; 
  }
  if (!includeNumbers) {
    allElements--; 
  }
  console.log(allElements);
  // If unclicking our current element would set 
  // clickedElements to 0, don't unclick it. 
  // Call events for alert box and disable clicking everywhere else.
  if (allElements == 0) {
    element.checked = true;
    var alertBox = document.getElementById("alertMessage");
    var closeBtn = document.getElementById("closeBtn");
    document.getElementsByTagName("body")[0].style.pointerEvents = "none"; 
    alertBox.style.visibility = "visible";
    closeBtn.style.visibility = "visible";
    alertBox.style.boxShadow = "0 0 0 100000vh rgba(0,0,0,.3)";
    alertBox.style.pointerEvents = "all"; 
  }
}
function closeAlert(closeBtn) {
  closeBtn.style.visibility="hidden";
  closeBtn.parentElement.style.visibility="hidden";
  document.getElementsByTagName("body")[0].style.pointerEvents = "all"; 
}
function getPossibleChars(characterAmount, includeUppercase, includeLowercase, 
  includeSymbols, includeNumbers){
    let charCodes = []; 
    if (includeUppercase) {
      charCodes = charCodes.concat(upperCaseCodes);
    }
    if (includeLowercase) {
      charCodes = charCodes.concat(lowerCaseCodes);
    }
    if (includeSymbols) {
      charCodes = charCodes.concat(symbolCodes);
    }
    if (includeNumbers) {
      charCodes = charCodes.concat(numberCodes);
    }
    possibleCharacters = charCodes.length;
    return possibleCharacters;
}
//#endregion