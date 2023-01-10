console.log('hello from content file');

chrome.runtime.sendMessage('from content script', (res) => {
  console.log(res);
});
