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

// Example usage:
const followers = "bhavyas_024, ayan____181, rustydozen, _iam_nr_, riley.xik";
const following = "bhavyas_024, ayan____181, rustydozen, _iam_nr_, soham0798, aacchhall, amarjeettuti";

const unfollowedList = findUnfollowed(followers, following);
console.log(unfollowedList); // This will output the list of users that 'following' is following but 'followers' are not following
