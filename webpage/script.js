// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // Set up event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Form submission
    document.getElementById('input-form').addEventListener('submit', handleFormSubmit);
    
    // FAQ toggle functionality
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            // Toggle the active class on the parent element
            this.parentElement.classList.toggle('active');
            
            // Find the answer element
            const answer = this.nextElementSibling;
            
            // Toggle the visibility of the answer with a smooth animation
            if (this.parentElement.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
            } else {
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
            }
        });
    });
    
    // Initialize FAQ items (hide answers by default)
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.style.overflow = 'hidden';
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        answer.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
    });
    
    // Add hover effect to troubleshooting cards
    document.querySelectorAll('.troubleshooting-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });
}

function handleFormSubmit(e) {
    e.preventDefault();

    const followersText = document.getElementById('followers-text').value;
    const followingsText = document.getElementById('followings-text').value;

    if (!followersText || !followingsText) {
        showNotification('Please paste both followers and following lists.', 'error');
        return;
    }

    try {
        // Process the data
        const followers = extractUsernames(followersText);
        const followings = extractUsernames(followingsText);
        
        if (followers.length === 0 || followings.length === 0) {
            showNotification('Could not extract usernames from the provided data. Please check your input.', 'error');
            return;
        }

        // Find users who don't follow back
        const unfollowedList = findUnfollowed(followers, followings);
        
        // Display statistics
        displayStats(followers.length, followings.length, unfollowedList.length);
        
        // Display results
        displayResults(unfollowedList);
        
        // Scroll to results
        document.querySelector('.result-container').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error processing data:', error);
        showNotification('An error occurred while processing your data. Please try again.', 'error');
    }
}

function extractUsernames(rawData) {
    // Clean up the input data
    const cleanData = rawData.trim();
    
    // Try to detect if this is JSON data from "Copy object" in console
    if (cleanData.startsWith('[') && cleanData.endsWith(']')) {
        try {
            // Try to parse as JSON array
            const jsonData = JSON.parse(cleanData);
            if (Array.isArray(jsonData)) {
                return jsonData.filter(item => typeof item === 'string' && item.trim() !== '');
            }
        } catch (e) {
            console.log('Not valid JSON array, trying other methods');
        }
    }
    
    // Try to detect if this is console output with array notation
    if (cleanData.includes('[') && cleanData.includes(']')) {
        try {
            // Extract the array part from console output
            const arrayMatch = cleanData.match(/\[(.*)\]/s);
            if (arrayMatch && arrayMatch[1]) {
                // Try to parse the extracted array
                const jsonData = JSON.parse('[' + arrayMatch[1] + ']');
                if (Array.isArray(jsonData)) {
                    return jsonData.filter(item => typeof item === 'string' && item.trim() !== '');
                }
            }
        } catch (e) {
            console.log('Could not extract array from console output, trying regex extraction');
        }
    }
    
    // Fall back to regex extraction for each line
    const lines = cleanData.split('\n');
    const values = [];
    const regex = /"([^"]*)"/;

    lines.forEach(line => {
        // Skip lines that are likely not usernames
        if (!line.includes(':') && !line.includes('Follow') && !line.includes('Following')) {
            const match = regex.exec(line);
            if (match && match[1]) {
                values.push(match[1]);
            }
        }
    });
    
    // If we found values with regex, return them
    if (values.length > 0) {
        return values;
    }
    
    // Last resort: try to extract any word that looks like a username
    const usernameRegex = /\b[a-zA-Z0-9._]{3,30}\b/g;
    const possibleUsernames = cleanData.match(usernameRegex) || [];
    
    return possibleUsernames.filter(username => {
        // Filter out common words that might be mistaken for usernames
        const commonWords = ['true', 'false', 'null', 'undefined', 'console', 'log'];
        return !commonWords.includes(username.toLowerCase());
    });
}

function findUnfollowed(followers, followings) {
    const followerSet = new Set(followers);
    return followings.filter(username => !followerSet.has(username));
}

function displayStats(followersCount, followingsCount, unfollowedCount) {
    const statsElement = document.getElementById('result-stats');
    
    const followRatio = (followersCount / followingsCount * 100).toFixed(1);
    
    statsElement.innerHTML = `
        <div class="stats-container">
            <div class="stat-item">
                <span class="stat-value">${followersCount}</span>
                <span class="stat-label">Followers</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${followingsCount}</span>
                <span class="stat-label">Following</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${unfollowedCount}</span>
                <span class="stat-label">Not Following Back</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${followRatio}%</span>
                <span class="stat-label">Follow Ratio</span>
            </div>
        </div>
    `;
    
    // Add some CSS for the stats
    const style = document.createElement('style');
    style.textContent = `
        .stats-container {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .stat-item {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .stat-value {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary-color);
        }
        .stat-label {
            font-size: 0.9rem;
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
}

function displayResults(unfollowedList) {
    const resultElement = document.getElementById('result');
    
    if (unfollowedList.length === 0) {
        resultElement.innerHTML = '<p class="no-results">Great news! Everyone you follow is following you back!</p>';
        return;
    }
    
    // Sort alphabetically
    unfollowedList.sort();
    
    resultElement.innerHTML = unfollowedList.map(username => 
        `<a href="https://www.instagram.com/${username}/" target="_blank" class="user-card">
            <span class="username">${username}</span>
        </a>`
    ).join('');
}

function copyCode(type) {
    const elementId = type === 'followers' ? 'code-snippet-followers' : 'code-snippet-following';
    const codeSnippet = document.getElementById(elementId);
    
    // Use modern clipboard API if available
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(codeSnippet.textContent)
            .then(() => {
                showNotification('Code copied to clipboard!', 'success');
            })
            .catch(() => {
                // Fall back to the old method if clipboard API fails
                fallbackCopyTextToClipboard(codeSnippet);
            });
    } else {
        // Use the old method for browsers that don't support clipboard API
        fallbackCopyTextToClipboard(codeSnippet);
    }
}

function fallbackCopyTextToClipboard(element) {
    const range = document.createRange();
    range.selectNode(element);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification('Code copied to clipboard!', 'success');
        } else {
            showNotification('Failed to copy code. Please try selecting it manually.', 'error');
        }
    } catch (err) {
        console.error('Unable to copy', err);
        showNotification('Failed to copy code. Please try selecting it manually.', 'error');
    }
    
    window.getSelection().removeAllRanges();
}

function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add close button
    const closeBtn = document.createElement('span');
    closeBtn.className = 'notification-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = function() {
        notification.remove();
    };
    notification.appendChild(closeBtn);
    
    // Add to document
    document.body.appendChild(notification);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 40px 15px 15px;
            border-radius: 4px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideIn 0.3s ease-out forwards;
        }
        .notification.success {
            background-color: var(--success-color);
        }
        .notification.error {
            background-color: var(--error-color);
        }
        .notification.info {
            background-color: var(--primary-color);
        }
        .notification-close {
            position: absolute;
            top: 5px;
            right: 10px;
            cursor: pointer;
            font-size: 20px;
        }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

function switchTab(tabName) {
    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.tab-btn[onclick="switchTab('${tabName}')"]`).classList.add('active');
    
    // Show the selected tab content
    document.querySelectorAll('.code-container').forEach(container => {
        container.classList.add('hidden');
    });
    document.getElementById(`${tabName}-code`).classList.remove('hidden');
}

function clearTextarea(id) {
    document.getElementById(id).value = '';
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    // Save preference
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

function redirectToGithub() {
    window.open('https://github.com/prathamreet/instafication', '_blank');
}
