// console.log('hello from backround test');

// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//   console.log(msg);
//   console.log(sender);
//   sendResponse();
// });

import {
  setStoredCities,
  setStoredOptions,
  getStoredCities,
  getStoredOptions,
} from '../utils/storage';
import { fetchOpenWeatherData } from '../utils/api';

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([]);
  setStoredOptions({
    homeCity: '',
    tempScale: 'imperial',
    hasAutoOverlay: false,
  });

  chrome.contextMenus.create({
    contexts: ['selection'],
    title: 'Add city to weather extention',
    id: 'weatherExtention',
  });
  chrome.alarms.create({
    periodInMinutes: 1 / 6,
  });
});

chrome.contextMenus.onClicked.addListener((event) => {
  getStoredCities().then((cities) => {
    setStoredCities([...cities, event.selectionText]);
  });
});

chrome.alarms.onAlarm.addListener(() => {
  getStoredOptions().then((options) => {
    if (options.homeCity === '') {
      return;
    }

    fetchOpenWeatherData(options.homeCity, options.tempScale).then((data) => {
      const temp = Math.round(data.main.temp);
      const symbol = options.tempScale === 'metric' ? '\u2103' : '\u2109';
      chrome.action.setBadgeText({
        text: `${temp} ${symbol}`,
      });
    });
  });
});
