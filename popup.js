// Popup JavaScript for ChatGPT Quick Access Extension

document.addEventListener('DOMContentLoaded', function() {
    // Get the button element
    const openButton = document.getElementById('openChatGPT');
    
    // Add click event listener to the button
    openButton.addEventListener('click', function() {
        // Send message to background script to open ChatGPT
        chrome.runtime.sendMessage({ action: 'openChatGPT' });
        
        // Close the popup
        window.close();
    });
    
    // Add keyboard event listener for Enter key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            openButton.click();
        }
    });
    
    // Focus the button for better accessibility
    openButton.focus();
}); 