document.getElementById('input-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const followersText = document.getElementById('followers-text').value;
    const followingsText = document.getElementById('followings-text').value;

    if (followersText && followingsText) {
        const followers = extractStringValues(followersText);
        const followings = extractStringValues(followingsText);

        const unfollowedList = findUnfollowed(followers, followings);

        document.getElementById('result').innerHTML = unfollowedList.map(username => 
            `<a href="https://www.instagram.com/${username}/" target="_blank">${username}</a>`
        ).join(' ');
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

    return values.join(' ');
}

function findUnfollowed(followers, followings) {
    const followerSet = new Set(followers.split(' ').map(item => item.trim()));
    return followings.split(' ').map(item => item.trim()).filter(item => !followerSet.has(item));
}

function copyCode() {
    const codeSnippet = document.getElementById('code-snippet');
    const range = document.createRange();
    range.selectNode(codeSnippet);
    window.getSelection().removeAllRanges();  // Clear any current selection
    window.getSelection().addRange(range);  // Select the code
    document.execCommand('copy');  // Copy the selected text to clipboard
    window.getSelection().removeAllRanges();  // Deselect the text

    // Optionally, show a message or change button text to indicate success
    alert("Code copied to clipboard!");
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

function redirectToGithub() {
    // window.location.href = 'https://github.com/prathamreet/instafication';  // Replace with your GitHub repo URL
    window.open('https://github.com/prathamreet/instafication', '_blank');
}
