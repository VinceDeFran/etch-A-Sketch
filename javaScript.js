// Find the gridContainer element
const gridContainer = document.querySelector('.gridContainer');

let N = 96;

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
        if (event.button === 0) {
          leftButtonDown = true;
          gridBox.style.backgroundColor = 'blue';
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
        if (leftButtonDown || (event.buttons & 1) === 1) {
          gridBox.style.backgroundColor = 'blue';
        }
      });

      gridRow.appendChild(gridBox);
    }

    gridContainer.appendChild(gridRow);
  }
} else {
  console.error('No element with class gridContainer found');
}


 console.log("Grid script ran.")
