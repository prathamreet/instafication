const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function convertClassInputToSelector(classString) {
    // Split the class string into individual class names
    let classes = classString.split(' ');

    // Map each class name to create a selector string
    let selector = classes.map(className => `.${className}`).join(', ');

    // Log the generated selector (for demonstration)
    console.log("Generated selector:", selector);

    // You can perform other operations with the generated selector here
    // For example, querying a database or processing files based on the selector
}

// Function to handle input
function handleInput(classString) {
    convertClassInputToSelector(classString);
    rl.close();
}

// Ask user to enter the class names separated by spaces
rl.question('Enter the class names separated by spaces: ', (classString) => {
    handleInput(classString);
});

// Example usage:
// convertClassInputToSelector("class1 class2 class3");
