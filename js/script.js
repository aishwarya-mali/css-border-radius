const topLeft = document.getElementById('inputTopLeft')
const topRight = document.getElementById('inputTopRight')
const bottomLeft = document.getElementById('inputBottomLeft')
const bottomRight = document.getElementById('inputBottomRight')
const btnReset = document.getElementById('reset')
const btnCopy = document.getElementById('copy')
const main = document.querySelector('.main-box')
const code = document.querySelector('.code-area code')
const errorMessages = document.querySelectorAll('.errorMessage')
const inputs = document.querySelectorAll('.input')
const pattern = /^[0-9]+(px|%|rem|em)$/
let topLeftValue = '';
let topRightValue = '';
let bottomLeftValue = '';
let bottomRightValue = '';

function validateInput(input, errorMessage) {
  const isValid = pattern.test(input.value);
  if (isValid) {
    input.style.borderColor = 'initial';
    errorMessage.style.display = "none";
    return true;
  } else {
    input.style.borderColor = 'red';
    errorMessage.style.display = "block";
    return false;
  }
}

function updateBoxStyles(tl, tr, br, bl) {
  main.style.borderTopLeftRadius = tl;
  main.style.borderTopRightRadius = tr;
  main.style.borderBottomRightRadius = br;
  main.style.borderBottomLeftRadius = bl;
  updateCode(tl, tr, br, bl);
}

function updateCode(lt, rt, rb, lb) {
  code.innerHTML = ''
  const value = `${lt} ${rt} ${rb} ${lb}`
  const html =
    `
    border-radius: ${value}; <br/>
    -moz-border-radius: ${value}; <br/>
    -webkit-border-radius: ${value};  <br/>
  `
  code.insertAdjacentHTML('afterbegin', html)
}

function resetValues() {
  topLeft.value = topRight.value = bottomLeft.value = bottomRight.value = ''
  errorMessages.forEach(err => {
    err.style.display = "none"
  })
  inputs.forEach(input => {
    input.style.borderColor = 'initial'
  })
}

function copyCode() {
  const text = code.textContent
  navigator.clipboard.writeText(text)
    .then(() => {
      code.style.backgroundColor = '#FF8A65'
      code.style.color = '#333333'
      setTimeout(() => {
        code.style.backgroundColor = ''
        code.style.color = ''
      }, 1000)
    })
    .catch((err) => {
      console.error('Failed to copy text: ', err)
    })
}

topLeft.addEventListener('input', function (e) {
  const errorMessage = document.getElementById('tl');
  const isValid = validateInput(this, errorMessage);
  if (!isValid) return;
  topLeftValue = e.target.value
  updateBoxStyles(topLeftValue, topRightValue, bottomRightValue, bottomLeftValue)
  updateCode(topLeftValue, topRightValue, bottomRightValue, bottomLeftValue)
})

topRight.addEventListener('input', function (e) {
  const errorMessage = document.getElementById('tr');
  const isValid = validateInput(this, errorMessage);
  if (!isValid) return;
  topRightValue = e.target.value
  updateBoxStyles(topLeftValue, topRightValue, bottomRightValue, bottomLeftValue)
  updateCode(topLeftValue, topRightValue, bottomRightValue, bottomLeftValue)
})

bottomRight.addEventListener('input', function (e) {
  const errorMessage = document.getElementById('br');
  const isValid = validateInput(this, errorMessage);
  if (!isValid) return;
  bottomRightValue = e.target.value
  updateBoxStyles(topLeftValue, topRightValue, bottomRightValue, bottomLeftValue)
  updateCode(topLeftValue, topRightValue, bottomRightValue, bottomLeftValue)
})

bottomLeft.addEventListener('input', function (e) {
  const errorMessage = document.getElementById('bl');
  const isValid = validateInput(this, errorMessage);
  if (!isValid) return;
  bottomLeftValue = e.target.value
  updateBoxStyles(topLeftValue, topRightValue, bottomRightValue, bottomLeftValue)
  updateCode(topLeftValue, topRightValue, bottomRightValue, bottomLeftValue)
})

btnReset.addEventListener('click', resetValues)

btnCopy.addEventListener('click', copyCode)