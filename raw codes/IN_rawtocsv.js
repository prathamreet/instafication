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
