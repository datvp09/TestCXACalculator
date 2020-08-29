import {isIphoneX} from 'react-native-iphone-x-helper';
import {Platform} from 'react-native';

const isiOS = Platform.OS == 'ios';
const isAndroid = Platform.OS == 'android';
const isIpX = isIphoneX();
const numberButtons = [
  ['clear'],
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
];
const mathButtons = ['÷', '*', '-', '+', '='];
const initialOutput = '0';

export {isiOS, isAndroid, isIpX, numberButtons, mathButtons, initialOutput};
