import { StyleSheet } from 'react-native'

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  font24:24,
  h4:20,
  input: 18,
  regular: 17,
  regular16: 16,
  medium: 14,
  small: 12,
  
  W100: 100,
  W200: 200,
  W300: 300,
  W400:400,
  W500:500,
  W600: 600,
  W700: 700,
  W800: 800,
  W900: 900,
}



export default StyleSheet.create({
  h1: {
    fontSize: size.h1,
  },
  h2: {
    fontSize: size.h2,
  },
  h3: {
    fontSize: size.h3,
  },
  
  font24: {
    fontSize: size.h4,
  },
  normal: {
    fontSize: size.regular,
  },
})
