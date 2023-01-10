// console.log('hello from backround test');

// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//   console.log(msg);
//   console.log(sender);
//   sendResponse();
// });

import { setStoredCities } from '../utils/storage';

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([]);
});
