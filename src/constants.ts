import { Bang } from './search';

export const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

export const colors = {
  black: (!isDarkMode ? '#444' : '#fff'),
  white: (!isDarkMode ? '#fff' : '#444'),

  black2: (!isDarkMode ? '#666' : '#ccc'),

  lightBlack: '#999',
  lighterBlack: '#aaa',
  lightestBlack: '#bbb',

  whiteHover: (!isDarkMode ? '#f9f9f9' : '#333'),
  whiteActive: (!isDarkMode ? '#f1f1f1' : '#222'),

  blackHover: (!isDarkMode ? '#111': '#f9f9f9'),
  blackActive: (!isDarkMode ? '#111' : '#f1f1f1'),

  lightGray: '#eeeeee',

  red: '#ef5350'
};

export const bangs: Bang.T[] = [
  { name: "google", template: "https://www.google.com/search?q=<query>" },
  { name: "g", template: "https://www.google.com/search?q=<query>" },

  { name: "amazon", template: "https://www.amazon.com/s?k=<query>" },
  { name: "a", template: "https://www.amazon.com/s?k=<query>" },

  { name: "reddit", template: "https://www.reddit.com/search?q=<query>" },
  { name: "r", template: "https://www.reddit.com/search?q=<query>" },

  { name: "stackoverflow", template: "https://stackoverflow.com/search?q=<query>" },
  { name: "s", template: "https://stackoverflow.com/search?q=<query>" },

  { name: "wikipedia", template: "https://en.wikipedia.org/wiki/Special:Search?search=<query>" },
  { name: "w", template: "https://en.wikipedia.org/wiki/Special:Search?search=<query>" },

  { name: "youtube", template: "https://www.youtube.com/results?search_query=<query>" },
  { name: "y", template: "https://www.youtube.com/results?search_query=<query>" },

  { name: "github", template: "https://github.com/search?q=<query>" },
  { name: "gi", template: "https://github.com/search?q=<query>" },

  { name: "goodreads", template: "https://www.goodreads.com/search?q=<query>" },
  { name: "go", template: "https://www.goodreads.com/search?q=<query>" },
];
