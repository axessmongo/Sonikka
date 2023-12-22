function checkFilePath() {
    // For simplicity, let's assume the file path is entered in a prompt.
    var enteredPath = prompt("Enter file path:");

    // Perform your validation here (this is a simple example)
    var isValidPath = validateFilePath(enteredPath);

    // Redirect to the 404 page if the path is not valid
    if (!isValidPath) {
        window.location.href = '404.html';
    }
}

// Simple validation function (replace with your own logic)
function validateFilePath(path) {
    // In a real-world scenario, you might use AJAX to check if the file exists on the server.
    // For simplicity, this example only checks if the path is not empty.
    return path.trim() !== '';
}

// Call the function when needed, e.g., when a button is clicked
// For demonstration purposes, this example calls the function on page load.
checkFilePath();