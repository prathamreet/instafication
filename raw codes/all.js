//1st component: class converter to comma sparated

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


//2nd Component: getting names of follower from typing it in console

function ER_extractUsernames() {
    const usernames = [];
    const elements = document.querySelectorAll('._ap3a, ._aaco, ._aacw, ._aacx, ._aad7, ._aade');
    
    elements.forEach(element => {
        const username = element.textContent.trim(); // Assuming the username is in the text content of the element
        usernames.push(username);
    });

    return usernames;
}

// Example usage
const followersUsernames = ER_extractUsernames();
console.log(followersUsernames);


//3rd component: getting names of followings from typing it in console

function IN_extractUsernames() {
    const usernames = [];
    const elements = document.querySelectorAll('._ap3a, ._aaco, ._aacw, ._aacx, ._aad7, ._aade');
    
    elements.forEach(element => {
        const username = element.textContent.trim(); // Assuming the username is in the text content of the element
        usernames.push(username);
    });

    return usernames;
}

// Example usage
const followingsUsernames = IN_extractUsernames();
console.log(followingsUsernames);

//4th component: converting raw data of followers with unwanted letters to usernames with comma separated values

const fs = require('fs');

function extractStringValues(rawData) {
    // Split the raw data by newline characters to process each line
    const lines = rawData.split('\n');
    const values = [];

    // Regular expression to match strings within double quotes
    const regex = /"([^"]*)"/;

    lines.forEach(line => {
        // Remove unnecessary elements and extract string values
        if (!line.includes(':') && !line.includes('Follow') && !line.includes('Following')) {
            const match = regex.exec(line);
            if (match && match[1]) {
                values.push(match[1]);
            }
        }
    });

    // Join the extracted values into a comma-separated string
    return values.join(', ');
}

// Read data from the text file
fs.readFile('ER.txt', 'utf8', (err, rawData) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    const result = extractStringValues(rawData);
    console.log(result); // Output the result to the console

    // Save the result to a new text file
    fs.writeFile('ER_csv.txt', result, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Extracted values have been saved to output.txt');
        }
    });
});

//5th component: converting raw data of followings with unwanted letters to usernames with comma separated values

const fs = require('fs');

function extractStringValues(rawData) {
    // Split the raw data by newline characters to process each line
    const lines = rawData.split('\n');
    const values = [];

    // Regular expression to match strings within double quotes
    const regex = /"([^"]*)"/;

    lines.forEach(line => {
        // Remove unnecessary elements and extract string values
        if (!line.includes(':') && !line.includes('Follow') && !line.includes('Following')) {
            const match = regex.exec(line);
            if (match && match[1]) {
                values.push(match[1]);
            }
        }
    });

    // Join the extracted values into a comma-separated string
    return values.join(', ');
}

// Read data from the text file
fs.readFile('IN.txt', 'utf8', (err, rawData) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    const result = extractStringValues(rawData);
    console.log(result); // Output the result to the console

    // Save the result to a new text file
    fs.writeFile('IN_csv.txt', result, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Extracted values have been saved to output.txt');
        }
    });
});


//6th component: comparing followers and followings from ER.txt and IN.txt and producin result as result.txt

const fs = require('fs');

function findUnfollowed(data1, data2) {
    // Split the comma-separated strings into arrays
    const followers = data1.split(',').map(item => item.trim());
    const following = data2.split(',').map(item => item.trim());

    // Create a Set for faster lookup of followers
    const followerSet = new Set(followers);

    // Filter the following list to get values not present in followers
    const unfollowed = following.filter(item => !followerSet.has(item));

    // Return the array of unfollowed users (or values)
    return unfollowed;
}

// Function to read a file and return its content as a promise
function readFileAsync(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// Main function to execute the comparison and write the result to a file
async function processFiles() {
    try {
        const followers = await readFileAsync('ER_csv.txt');
        const following = await readFileAsync('IN_csv.txt');

        const unfollowedList = findUnfollowed(followers, following);

        // Save the result to a new text file
        const output = unfollowedList.join(', ');
        fs.writeFile('result.txt', output, (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('Unfollowed list has been saved to unfollowed.txt');
            }
        });
    } catch (error) {
        console.error('Error processing files:', error);
    }
}

// Execute the main function
processFiles();
