import { StyleSheet, Dimensions } from 'react-native';
export default StyleSheet.create({
  flexbox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    margin: 10,
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  indicator: {
    transform: [
      { translateY: Dimensions.get('window').height * 0.4 }
    ],
  },
});
