

let N = 96;
let pixelColor = '#0000FF';
let rainbowOn = 0;
let shadeOn = 0;
let pixelRgba = 'rgba(0, 0, 255, 1)';


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

function getRandomHexColor() {
  const hex = Math.floor(Math.random() * 0x1000000).toString(16);
  return hex.padStart(6, '0');
}

function hexToRgba(hex) {
  // Remove the '#' if present
  let cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;

  // Handle 3-digit shorthand hex codes (e.g., "F00" becomes "FF0000")
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('');
  }

  // Validate the hex string length
  if (cleanHex.length !== 6) {
    throw new Error("Invalid hex color string. Must be 3 or 6 digits (excluding '#').");
  }

  // Parse the R, G, and B components
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);


  pixelRgba = `rgba(${r}, ${g}, ${b}, 0.2)`;
}



//BUTTONS/////////////////////////////////
//////////////////////////////////////////
document.getElementById('resetBtn').addEventListener('click', function() {
  rainbowOn = 0;
  shadeOn = 0;
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
  pixelColor = '#FFFF00';
});

document.getElementById('orangeBtn').addEventListener('click', function() {
  rainbowOn = 0;
  shadeOn = 0;
  pixelColor='#FFA500';
});

document.getElementById('redBtn').addEventListener('click', function() {
  rainbowOn = 0;
  shadeOn = 0;
  pixelColor = '#FF0000';
});
document.getElementById('blueBtn').addEventListener('click', function() {
  rainbowOn = 0;
  shadeOn = 0;
  pixelColor = '#0000FF';
});
document.getElementById('greenBtn').addEventListener('click', function() {
  rainbowOn = 0;
  shadeOn = 0;
  pixelColor = '#00FF00';
});
document.getElementById('blackBtn').addEventListener('click', function() {
  rainbowOn = 0;
  shadeOn = 0;
  pixelColor= '#000000';
});
document.getElementById('whiteBtn').addEventListener('click', function() {
  rainbowOn = 0;
  shadeOn = 0;
  pixelColor= '#FFFFFF';
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

        // Track left mouse button pressed state per gridBox
        let leftButtonDown = false;

        gridBox.addEventListener('mousedown', (event) => {
          // Left mouse button is event.button === 0
          if ((event.button === 0) && !rainbowOn && !shadeOn) {
            leftButtonDown = true;
            gridBox.style.backgroundColor = pixelColor;
            // Optional: prevent text selection or dragging
            event.preventDefault();
          }
          if ((event.button === 0) && rainbowOn) {
            leftButtonDown = true;
            pixelColor = `#${getRandomHexColor()}`;
            gridBox.style.backgroundColor = pixelColor;
            // Optional: prevent text selection or dragging
            event.preventDefault();
          }
          if ((event.button === 0) && shadeOn) {
            leftButtonDown = true;
            hexToRgba(pixelColor);
            gridBox.style.backgroundColor = pixelRgba;
            // Optional: prevent text selection or dragging
            event.preventDefault();
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
            gridBox.style.backgroundColor = pixelColor;
          }
          if ((leftButtonDown || (event.buttons & 1) === 1) && rainbowOn){
            pixelColor = `#${getRandomHexColor()}`;
            gridBox.style.backgroundColor = pixelColor;
          }
          if ((leftButtonDown || (event.buttons & 1) === 1) && shadeOn){
            hexToRgba(pixelColor);
            gridBox.style.backgroundColor = pixelRgba;
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
