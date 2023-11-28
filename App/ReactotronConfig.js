// import Reactotron, { trackGlobalErrors } from 'reactotron-react-native'
 
// import { reactotronRedux } from 'reactotron-redux'


// const reactotron = Reactotron
//  .configure({ name: 'React Native Demo' })
// .use(reactotronRedux()) //  <- here i am!
// .useReactNative() // add all built-in react native plugins
//  .connect() //Don't forget about me!  

// export default reactotron


// Reactotron
//   .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
//   .configure() // controls connection & communication settings
// //   .use(trackGlobalErrors({
// //     veto: frame => frame.fileName.indexOf('/node_modules/react-native/') >= 0
// //    }))
// //.use(sagaPlugin()) // <-- sweet
// .useReactNative() // add all built-in react native plugins
//   .connect() // let's connect!