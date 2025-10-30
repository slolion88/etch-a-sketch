function validateInput(input) {
    let validated = false;

    while (!validated) {
        // If the user has clicked cancel or ok without entering a string, reset to default
        if (input === null || input === "") {
            input = DEFAULT_GRID_SIZE;
            validated = true;
            console.log("this shows if input was null or an empty string: " + input);
        } else {
            // Plus symbol converts it to a number.
            input = +input;

            if (Number.isNaN(input) || input < 1 || input > 100) {
                input = prompt("Please try again, enter a number between 1 and 100:");
            } else {
                validated = true;
            }
        }
    }
    return input;
}

// Creating a random rgb color - rgb(###, ###, ###) where ### ranges from 0 to 255
function randomizeColor() {
    let color = "rgb(";

    for (let i = 0; i < 3; i++) {
        color += Math.floor(Math.random() * 255);
        // Closes up the formatting of the rgb string
        color += i < 2 ? "," : ")";
    }

    return color;
}

function createGrid(size) {
    const DEFAULT_GRID_WIDTH = 960;
    let boxDimensions = DEFAULT_GRID_WIDTH / size;

    // Remove the old grid
    const container = document.querySelector(".container");
    while (container.firstElementChild) {
        container.removeChild(container.firstElementChild);
    }

    // Add a new grid
    for (let numberOfBoxes = 0; numberOfBoxes < size ** 2; numberOfBoxes++) {
        const box = document.createElement("div");
        box.className = "box";
        box.style.width = boxDimensions + "px";
        box.style.height = boxDimensions + "px";
        box.style.opacity = "0.0";
        box.style.backgroundColor = randomizeColor();
        container.appendChild(box);

        box.addEventListener("mouseover", function () {
            let opacity = +(box.style.opacity) + 0.1;

            if (opacity > 1) {
                opacity = 1;
            }
            box.style.opacity = opacity + "";
        });
    }
}

const DEFAULT_GRID_SIZE = 16;
createGrid(DEFAULT_GRID_SIZE);

let modifiedGridSize = DEFAULT_GRID_SIZE;

const resizeButton = document.querySelector(".buttons #resize");
resizeButton.addEventListener("click", () => createGrid(validateInput(prompt("Boxes per side (1-100):"))));

const resetButton = document.querySelector(".buttons #reset");
resetButton.addEventListener("click", () => createGrid(DEFAULT_GRID_SIZE));