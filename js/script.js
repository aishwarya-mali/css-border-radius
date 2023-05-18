const topLeft = document.getElementById('inputTopLeft')
const topRight = document.getElementById('inputTopRight')
const bottomLeft = document.getElementById('inputBottomLeft')
const bottomRight = document.getElementById('inputBottomRight')
const btnReset = document.getElementById('reset')
const main = document.querySelector('.main-box')
const code = document.querySelector('.code-area code')
const pattern = /^[0-9]+(px|%|rem|em)$/
let tl = 0;
let tr = 0;
let bl = 0;
let br = 0;

topLeft.addEventListener('input', function (e) {
  const isValid = validateInput(this, 'tl')
  if (!isValid) return;
  tl = e.target.value
  main.style.borderTopLeftRadius = tl
  updateCode(tl, tr, br, bl)
})

topRight.addEventListener('input', function (e) {
  const isValid = validateInput(this, 'tr')
  if (!isValid) return;
  tr = e.target.value
  main.style.borderTopRightRadius = tr
  updateCode(tl, tr, br, bl)
})

bottomRight.addEventListener('input', function (e) {
  const isValid = validateInput(this, 'br')
  if (!isValid) return;
  br = e.target.value
  main.style.borderBottomRightRadius = br
  updateCode(tl, tr, br, bl)
})

bottomLeft.addEventListener('input', function (e) {
  const isValid = validateInput(this, 'bl')
  if (!isValid) return;
  bl = e.target.value
  main.style.borderBottomLeftRadius = bl
  updateCode(tl, tr, br, bl)
})

function validateInput(input, dir) {
  const isValid = pattern.test(input.value);
  const errorMessage = document.getElementById(dir);
  if (isValid) {
    input.style.borderColor = 'initial'
    errorMessage.style.display = "none";
    return true;
  } else {
    input.style.borderColor = 'red'
    errorMessage.style.display = "block";
    return false;
  }
}

function updateCode(lt, rt, rb, lb) {
  code.innerHTML = ''
  const html =
    `
    border-radius: ${tl} ${tr} ${br} ${bl}; <br/>
    -moz-border-radius: ${tl} ${tr} ${br} ${bl}; <br/>
    -webkit-border-radius: ${tl} ${tr} ${br} ${bl};  <br/>
  `
  code.insertAdjacentHTML('afterbegin', html)
}