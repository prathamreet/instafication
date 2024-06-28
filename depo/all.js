document.getElementById('upload-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const followersFile = document.getElementById('followers-file').files[0];
    const followingsFile = document.getElementById('followings-file').files[0];

    if (followersFile && followingsFile) {
        Promise.all([readFile(followersFile), readFile(followingsFile)])
            .then(filesContent => {
                const followersContent = filesContent[0];
                const followingsContent = filesContent[1];

                const followers = extractStringValues(followersContent);
                const followings = extractStringValues(followingsContent);

                const unfollowedList = findUnfollowed(followers, followings);

                document.getElementById('result').textContent = unfollowedList.join(', ');
            })
            .catch(error => {
                console.error('Error reading files:', error);
            });
    } else {
        alert('Please upload both files.');
    }
});

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            resolve(event.target.result);
        };
        reader.onerror = function (event) {
            reject(event.target.error);
        };
        reader.readAsText(file);
    });
}

function extractStringValues(rawData) {
    const lines = rawData.split('\n');
    const values = [];
    const regex = /"([^"]*)"/;

    lines.forEach(line => {
        if (!line.includes(':') && !line.includes('Follow') && !line.includes('Following')) {
            const match = regex.exec(line);
            if (match && match[1]) {
                values.push(match[1]);
            }
        }
    });

    return values.join(', ');
}

function findUnfollowed(followers, followings) {
    const followerSet = new Set(followers.split(',').map(item => item.trim()));
    return followings.split(',').map(item => item.trim()).filter(item => !followerSet.has(item));
}
