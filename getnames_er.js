function extractUsernames() {
    const usernames = [];
    const elements = document.querySelectorAll('._ap3a, ._aaco, ._aacw, ._aacx, ._aad7, ._aade');
    
    elements.forEach(element => {
        const username = element.textContent.trim(); // Assuming the username is in the text content of the element
        usernames.push(username);
    });

    return usernames;
}

// Example usage
const followersUsernames = extractUsernames();
console.log(followersUsernames);
