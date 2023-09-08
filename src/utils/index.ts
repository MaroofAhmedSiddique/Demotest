import {Dimensions} from 'react-native';

export function getTimeBasedGreeting(name) {
  const currentTime = new Date().getHours();
  if (currentTime >= 4 && currentTime < 12) {
    return `Good morning, ${name}!`;
  } else if (currentTime >= 12 && currentTime < 16) {
    return `Good afternoon, ${name}!`;
  } else {
    return `Good night, ${name}!`;
  }
}

// color theme
export const blue_theme = '#4caaed';

// Static User Detail
export const user = {
  EMAIL: 'maroof@gmail.com',
  PASSWORD: 'Maroof@012',
  NAME: 'Maroof',
  FULL_NAME: 'Maroof Ahmed Siddique',
};

// window width & height
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
