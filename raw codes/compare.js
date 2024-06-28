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
