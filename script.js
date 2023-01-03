// variables
const board = document.querySelector('#pixel-board');
const sizeInput = document.querySelector('#board-size');

// functions

const createInvidualColors = () => {
  const colorPalleteDiv = document.querySelector('#color-palette');
  for (let i = 0; i < 4; i += 1) {
    const createColors = document.createElement('div');
    createColors.className = 'color';
    colorPalleteDiv.appendChild(createColors);
  }
};

createInvidualColors();

const paletteColorsLocalStorage = () => { // REQUISITO 5
  const getPaletteColors = document.querySelectorAll('.color');
  const savePaletteColors = [];

  for (let i = 0; i < getPaletteColors.length; i += 1) {
    savePaletteColors.push(getPaletteColors[i].style.backgroundColor);
  }
  localStorage.setItem('colorPalette', JSON.stringify(savePaletteColors));
};

const randomizeColor = () => {
  const r = Math.floor(Math.random() * 254);
  const g = Math.floor(Math.random() * 254);
  const b = Math.floor(Math.random() * 254);

  return `rgb(${r},${g},${b})`;
};

const changeColors = () => {
  const colors = document.querySelectorAll('.color');
  for (let i = 0; i < colors.length; i += 1) {
    if (i === 0) {
      colors[i].style.backgroundColor = 'black'; // REQUISITO 3
    } else {
      colors[i].style.backgroundColor = randomizeColor();
    }
  }
  paletteColorsLocalStorage();
};

const changeColorsStorage = () => {
  const colors = document.querySelectorAll('.color');
  const getLocalStorageArray = JSON.parse(localStorage.getItem('colorPalette'));
  for (let i = 0; i < colors.length; i += 1) {
    colors[i].style.backgroundColor = getLocalStorageArray[i];
  }
};

// REQUISITO 4

const randomizeColorsButton = () => {
  const randomBtn = document.querySelector('#button-random-color');
  randomBtn.addEventListener('click', changeColors);
};

randomizeColorsButton();
// REQUISITO 6

function createPixelsFunction() {
  const createPixels = document.createElement('div');
  board.appendChild(createPixels);
  createPixels.className = 'pixel';
}

// REQUISITO 12
const pixelsLocalStorage = () => {
  localStorage.setItem('pixelBoard', board.innerHTML);
};

// REQUISITO 10

const paintPixel = () => {
  const pixel = document.querySelectorAll('.pixel');
  for (let j = 0; j < pixel.length; j += 1) {
    const selectedColor = document.querySelector('.selected');
    pixel[j].addEventListener('click', () => {
      pixel[j].style.backgroundColor = selectedColor.style.backgroundColor;
      pixelsLocalStorage();
    });
  }
};

// REQUISITO 8

const createSelectColorClass = () => {
  const color = document.querySelectorAll('.color');
  color[0].classList.add('selected');
  paintPixel();
};
createSelectColorClass();

// REQUISITO 9

const changeSelectedColor = () => {
  const color = document.querySelectorAll('.color');
  for (let i = 0; i < color.length; i += 1) {
    color[i].addEventListener('click', (event) => {
      for (let j = 0; j < color.length; j += 1) {
        color[j].classList.remove('selected');
      }
      event.target.classList.add('selected');
      paintPixel();
    });
  }
};
changeSelectedColor();

// REQUISITO 11

const clearButtonFunction = () => {
  const clearBtn = document.querySelector('#clear-board');
  const pixels = document.querySelectorAll('.pixel');
  clearBtn.addEventListener('click', () => {
    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].style.backgroundColor = 'white';
    }
    localStorage.removeItem('pixelBoard');
  });
};

// REQUISITO 14

const verifyInputConditions = (boardSizeInput) => {
  if (boardSizeInput > 50) {
    sizeInput.value = 50;
  } else if (boardSizeInput < 5) {
    sizeInput.value = 5;
  }
  return sizeInput.value;
};
// REQUISITO 13

const resizeBoard = (resizeInput) => {
  for (let i = 0; i < resizeInput; i += 1) {
    createPixelsFunction();
    for (let j = 1; j < resizeInput; j += 1) {
      createPixelsFunction();
    }
  }
  board.style.width = `${resizeInput * 44.4}px`;
};

// REQUISITO 15

const boardSizeLocalStorage = (inputValue) => {
  localStorage.setItem('boardSize', inputValue);
};

const changeBoardSize = () => {
  const getInputButton = document.querySelector('#generate-board');

  getInputButton.addEventListener('click', () => {
    if (!sizeInput.value) {
      window.alert('Board inválido!');
    } else {
      const verifyBoardSizeInput = verifyInputConditions(sizeInput.value);
      board.innerHTML = null;
      resizeBoard(verifyBoardSizeInput);
      boardSizeLocalStorage(sizeInput.value);
    }
  });
};

changeBoardSize();

const createPixelSquareLoops = () => {
  for (let i = 0; i < 5; i += 1) {
    createPixelsFunction();
    for (let j = 1; j < 5; j += 1) {
      createPixelsFunction();
    }
  }
};

const createPixelSquare = () => {
  if (localStorage.getItem('pixelBoard')) {
    board.innerHTML = localStorage.getItem('pixelBoard');
  } else {
    createPixelSquareLoops();
  }
};

window.onload = () => {
  if (!localStorage.getItem('colorPalette')) {
    changeColors();
  } else {
    changeColorsStorage();
  }

  if (localStorage.getItem('boardSize')) {
    const boardSize = localStorage.getItem('boardSize');
    sizeInput.value = boardSize;
    resizeBoard(sizeInput.value);
  } else {
    createPixelSquare();
  }

  clearButtonFunction();
  if (!localStorage.getItem('pixelBoard')) {
    paintPixel();
  }
};
