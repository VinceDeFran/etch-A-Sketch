

let N = 10;
let rainbowOn = 0;
let shadeOn = 0;
let r = 0;
let g = 0;
let b = 255;

function setPixels () {
  while (true) {
    let input = prompt("Enter a pixel size (number) between 3 and 96:");
    if (input === null) break; // User cancelled
    let parsed = parseInt(input, 10);
    if (!isNaN(parsed) && parsed >= 3 && parsed <= 96) {
      N = parsed;
      break;
    } else {
      alert("Please enter a valid number between 3 and 96.");
    }
  }
  document.querySelectorAll('div.gridRow, div.gridBox').forEach(function(el) {
  el.remove();
  });
  if (N == undefined) {
    N=3;
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 256);
}


//BUTTONS/////////////////////////////////
//////////////////////////////////////////
document.getElementById('resetBtn').addEventListener('click', function() {
  rainbowOn = 0;
  shadeOn = 0;
  r = 0;
  g = 0;
  b = 255;
  startDrawing();
});

document.getElementById('pixelSizeBtn').addEventListener('click', function() {
  rainbowOn = 0;
  shadeOn = 0;
  setPixels();
  startDrawing();
});

document.getElementById('rainbowBtn').addEventListener('click', function() {
  rainbowOn = 1;
  shadeOn = 0;
});

document.getElementById('shadeBtn').addEventListener('click', function() {
  rainbowOn = 0;
  shadeOn = 1;
});
document.getElementById('yellowBtn').addEventListener('click', function() {
  rainbowOn = 0;
  shadeOn = 0;
  r = 255;
  g = 255;
  b = 0;
});

document.getElementById('orangeBtn').addEventListener('click', function() {
  rainbowOn = 0;
  shadeOn = 0;
  r = 255;
  g = 165;
  b = 0;
});

document.getElementById('redBtn').addEventListener('click', function() {
  rainbowOn = 0;
  shadeOn = 0;
 r = 255;
 g = 0;
 b = 0;
});
document.getElementById('blueBtn').addEventListener('click', function() {
  rainbowOn = 0;
  shadeOn = 0;
  r = 0;
  g = 0;
  b = 255;
});
document.getElementById('greenBtn').addEventListener('click', function() {
  rainbowOn = 0;
  shadeOn = 0;
  r = 0;
  g = 255;
  b = 0;
});
document.getElementById('blackBtn').addEventListener('click', function() {
  rainbowOn = 0;
  shadeOn = 0;
  r = 0;
  g = 0;
  b = 0;
});
document.getElementById('whiteBtn').addEventListener('click', function() {
  rainbowOn = 0;
  shadeOn = 0;
  r = 255;
  g = 255;
  b = 255;
});
//END BUTTONS////////////////////////////////////////////////////////////////////////

function startDrawing () {
  // Find the gridContainer element
  const gridContainer = document.querySelector('.gridContainer');

  if (gridContainer) {
    // Get computed dimensions of gridContainer
    const containerStyles = getComputedStyle(gridContainer);
    const containerWidth = parseFloat(containerStyles.width);
    const containerHeight = parseFloat(containerStyles.height);

    // Calculate dimensions for gridRow and gridBox
    const gridRowHeight = containerHeight / N;
    const gridRowWidth = containerWidth;

    const gridBoxHeight = containerHeight / N;
    const gridBoxWidth = containerWidth / N;

    // Clear existing children if needed (optional)
    gridContainer.innerHTML = '';

    // Create and append N gridRow divs
    for (let i = 0; i < N; i++) {
      const gridRow = document.createElement('div');
      gridRow.className = 'gridRow';

      // Set gridRow styles
      gridRow.style.height = `${gridRowHeight}px`;
      gridRow.style.width = `${gridRowWidth}px`;
      gridRow.style.display = 'flex'; // to lay out gridBoxes horizontally

      // Create and append N gridBox divs inside each gridRow
      for (let j = 0; j < N; j++) {
        const gridBox = document.createElement('div');
        gridBox.className = 'gridBox';


        // Set gridBox styles
        gridBox.style.height = `${gridBoxHeight}px`;
        gridBox.style.width = `${gridBoxWidth}px`;
        gridBox.style.boxSizing = 'border-box'; // good practice for sizing
        gridBox.style.backgroundColor = 'rgb(255, 255, 255)';
        gridBox.style.opacity = 0.0;

        // Track left mouse button pressed state per gridBox
        let leftButtonDown = false;

        gridBox.addEventListener('mousedown', (event) => {
          // Left mouse button is event.button === 0
          if ((event.button === 0) && !rainbowOn && !shadeOn) {
            leftButtonDown = true;
            gridBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            gridBox.style.opacity = 1;
            // Optional: prevent text selection or dragging
            event.preventDefault();
          }
          if ((event.button === 0) && rainbowOn) {
            leftButtonDown = true;
            r = getRandomNumber();
            g = getRandomNumber();
            b = getRandomNumber();
            gridBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            gridBox.style.opacity = 1;
            // Optional: prevent text selection or dragging
            event.preventDefault();
          }
          if ((event.button === 0) && shadeOn) {
            leftButtonDown = true;
            const el = event.currentTarget;
            let currentOpacity = parseFloat(el.style.opacity);
            if (isNaN(currentOpacity)) {
              currentOpacity = 0;
            }
            if (el.style.opacity <= 1) {
            let newOpacity = currentOpacity + 0.1;
            el.style.opacity = newOpacity;
            }
            el.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
          }
        });

        gridBox.addEventListener('mouseup', (event) => {
          if (event.button === 0) {
            leftButtonDown = false;
          }
        });

        gridBox.addEventListener('mouseenter', (event) => {
          // event.buttons bitmask: 1 means left button pressed
          if ((leftButtonDown || (event.buttons & 1) === 1) && !rainbowOn && !shadeOn){
            gridBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            gridBox.style.opacity = 1;
          }
          if ((leftButtonDown || (event.buttons & 1) === 1) && rainbowOn){
            r = getRandomNumber();
            g = getRandomNumber();
            b = getRandomNumber();
            gridBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            gridBox.style.opacity = 1;
          }
          if ((leftButtonDown || (event.buttons & 1) === 1) && shadeOn){
            leftButtonDown = true;
            const el = event.currentTarget;
            let currentOpacity = parseFloat(el.style.opacity);
            if (isNaN(currentOpacity)) {
              currentOpacity = 0;
            }
            if (el.style.opacity <= 1) {
            let newOpacity = currentOpacity + 0.1;
            el.style.opacity = newOpacity;
            }
            el.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
          }
        });

        gridRow.appendChild(gridBox);
      }

      gridContainer.appendChild(gridRow);
    }
  } else {
    console.error('No element with class gridContainer found');
  }
}

startDrawing();
