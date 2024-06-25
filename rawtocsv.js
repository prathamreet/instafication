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

// Example usage:
const rawData = `
142
: 
"bhavyas_024"
143
: 
"Following"
144
: 
"ayan____181"
145
: 
"Following"
146
: 
"rustydozen"
147
: 
"Following"
148
: 
"_iam_nr_"
149
: 
"Following"
"Follow"
66
: 
"riley.xik"
67
: 
"Follow"
68
: 
"wheelwulfenite"
69
: 
"Follow"
70
: 
"soham0798"
71
: 
"aacchhall"
72
: 
"amarjeettuti"
73`;

const result = extractStringValues(rawData);
console.log(result); // Output: bhavyas_024, ayan____181, rustydozen, _iam_nr_, riley.xik, wheelwulfenite, soham0798, aacchhall, amarjeettuti
