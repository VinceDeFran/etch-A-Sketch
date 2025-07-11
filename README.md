# etch-A-Sketch
This is the Etch A Sketch project from the Foundations Course of The Oden Project.
The following is a simplified version of the instructions, which is meant to be a basic project plan.

Create a webpage with a 16x16 grid of square divs using JavaScript.
    Create basic HTML first in order to add items to the existing structure with one “container” div. 
    In JavaScript, add  the new divs  (add a console.log at the end to verify it loaded).
    In CSS, add the new ellements to use Flexbox to make the divs 16x16 (grid class or classes). 
    In CSS, set borders and margins stablize the squares, with a set 960px squared container.
    (Check JavaScript console for errors if the grid does not form. Check “elements” to see the new divs (might be hidden).

Set up a “hover” effect so that the grid divs change color when your mouse passes over them, leaving a (pixelated) trail through the grid like a pen.
    “Hovering” starts as the cursor enters a div and ends when it leaves. Set up event listeners for either of those events as a starting point. There are multiple ways to change the color of the divs, including: Adding a new class to the div, Changing the div’s background color using JavaScript, 
    
Add a button on the top of the screen that will send the user a popup asking for the number of squares (prompt) per side for the new grid. Once entered, the existing grid should be removed, and a new grid should be generated in the same total space.
    Set the limit for the user input to a maximum of 100 (A larger number can cause freezing or crashing).
    Use button tags in HTML to make a JavaScript function run they are clicked.

Transform the behavior of a square when interacting with the mouse by introducing a series of modifications:
    First by, randomizing RGB values with each interaction.
    Then by, implementing a progressive darkening effect where each interaction darkens the square by 10%. The goal is to achieve a fully black (or completely colored) square in only ten interactions. (Use the CSS opacity property).



    TEMP for BUTTON and autGen
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Dynamic Grid</title>
<style>
  /* Basic styles for visualization */
  .gridContainer {
    width: 600px;   /* fixed width */
    height: 600px;  /* fixed height */
    border: 1px solid #333;
    margin-top: 10px;
  }
  .gridRow {
    display: flex;
  }
  .gridBox {
    box-sizing: border-box;
    border: 1px solid #999;
  }
</style>
</head>
<body>

<button id="setGridSizeBtn">Set Grid Size</button>
<div class="gridContainer"></div>

<script>
  const gridContainer = document.querySelector('.gridContainer');
  const btn = document.getElementById('setGridSizeBtn');

  // Function to generate the grid
  function generateGrid(N) {
    if (!gridContainer) return;

    // Get container size
    const containerStyles = getComputedStyle(gridContainer);
    const containerWidth = parseFloat(containerStyles.width);
    const containerHeight = parseFloat(containerStyles.height);

    // Clear existing grid
    gridContainer.innerHTML = '';

    // Calculate sizes
    const gridRowHeight = containerHeight / N;
    const gridRowWidth = containerWidth;
    const gridBoxHeight = containerHeight / N;
    const gridBoxWidth = containerWidth / N;

    for (let i = 0; i < N; i++) {
      const gridRow = document.createElement('div');
      gridRow.className = 'gridRow';

      gridRow.style.height = `${gridRowHeight}px`;
      gridRow.style.width = `${gridRowWidth}px`;
      gridRow.style.display = 'flex';

      for (let j = 0; j < N; j++) {
        const gridBox = document.createElement('div');
        gridBox.className = 'gridBox';

        gridBox.style.height = `${gridBoxHeight}px`;
        gridBox.style.width = `${gridBoxWidth}px`;

        // Track left mouse button pressed state per gridBox
        let leftButtonDown = false;

        gridBox.addEventListener('mousedown', (event) => {
          if (event.button === 0) {
            leftButtonDown = true;
            gridBox.style.backgroundColor = 'blue';
            event.preventDefault();
          }
        });

        gridBox.addEventListener('mouseup', (event) => {
          if (event.button === 0) {
            leftButtonDown = false;
          }
        });

        gridBox.addEventListener('mouseenter', (event) => {
          if (leftButtonDown || (event.buttons & 1) === 1) {
            gridBox.style.backgroundColor = 'blue';
          }
        });

        gridRow.appendChild(gridBox);
      }

      gridContainer.appendChild(gridRow);
    }
  }

  // Initial grid generation with default N=3
  generateGrid(3);

  // Button click handler to prompt for N and regenerate grid
  btn.addEventListener('click', () => {
    let input = prompt('Enter the number of gridRows and gridBoxes per row (max 96):', '3');
    if (input === null) return; // user cancelled
    let N = parseInt(input, 10);

    if (isNaN(N) || N < 1) {
      alert('Please enter a valid positive number.');
      return;
    }
    if (N > 96) {
      alert('Maximum allowed value is 96.');
      return;
    }

    generateGrid(N);
  });
</script>

</body>
</html>
