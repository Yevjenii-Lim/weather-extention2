// console.log('hello from backround test');

// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//   console.log(msg);
//   console.log(sender);
//   sendResponse();
// });

import { setStoredCities, setStoredOptions } from '../utils/storage';

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([]);
  setStoredOptions({
    homeCity: '',
    tempScale: 'imperial',
  });
});
