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