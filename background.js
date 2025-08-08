// Background service worker for ChatGPT Quick Access extension

// Listen for keyboard commands
chrome.commands.onCommand.addListener((command) => {
  console.log('Command received:', command);
  if (command === "open-chatgpt") {
    console.log('Opening ChatGPT temporary chat...');
    openTemporaryChatGPT();
  } else if (command === "open-chatgpt-normal") {
    console.log('Opening ChatGPT normal...');
    openChatGPTNormal();
  }
});

// Function to open ChatGPT temporary chat
function openTemporaryChatGPT() {
  const chatGPTUrl = "https://chatgpt.com/?temporary-chat=true";
  console.log('Opening URL:', chatGPTUrl);
  
  // Create a new tab with the ChatGPT URL
  console.log('Creating new tab');
  chrome.tabs.create({ 
    url: chatGPTUrl,
    active: true
  });
}

// Function to open ChatGPT normal
function openChatGPTNormal() {
  const chatGPTUrl = "https://chatgpt.com/";
  console.log('Opening URL:', chatGPTUrl);
  
  // Create a new tab with the ChatGPT URL
  console.log('Creating new tab');
  chrome.tabs.create({ 
    url: chatGPTUrl,
    active: true
  });
}

// Listen for extension icon click (alternative way to open)
chrome.action.onClicked.addListener(() => {
  openChatGPT();
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'openChatGPT') {
    openChatGPT();
  }
}); 