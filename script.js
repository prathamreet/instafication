document.getElementById('input-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const followersText = document.getElementById('followers-text').value;
    const followingsText = document.getElementById('followings-text').value;

    if (followersText && followingsText) {
        const followers = extractStringValues(followersText);
        const followings = extractStringValues(followingsText);

        const unfollowedList = findUnfollowed(followers, followings);

        document.getElementById('result').textContent = unfollowedList.join(', ');
    } else {
        alert('Please paste both lists.');
    }
});

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
