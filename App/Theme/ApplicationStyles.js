/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import Colors from './Colors'
import Helpers from './Helpers'
import {  Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default {
  button: {
    backgroundColor: Colors.primary,
  },

pageContainer:{
  //backgroundColor:'orange',
  height:windowHeight
},
  header: {
    ...Helpers.colCenter,
    ...Helpers.mainSpaceAround,
    height:'20%',
  // backgroundColor:'yellow'
  },
 
  body: {
    ... Helpers.center, 
   height:'60%',

   ...Helpers.mainSpaceAround,
  // backgroundColor:'orange',
 
 
   },
  formConatiner: {
   ... Helpers.colCenter,
   width:'80%',
   ...Helpers.scrollSpaceBetween,
  // backgroundColor:'black'
  },
  footer: {

    ...Helpers.crossCenter,
    height:'20%',
   // backgroundColor:'red'
  },

  loginFormControl:{
    ...Helpers.mainSpaceAround,
    height:'50%',
    // backgroundColor:'red',
      
 
  },

  tabContainer: {
    width: 30,
    height: 30,
    position: 'relative',
  },
  tabBadge: {
    position: 'absolute',
    top: -8, 
    right:16,
    backgroundColor: 'red',
    borderRadius: 10, 
    zIndex: 2,
    height:20,
    width:20,
    justifyContent:'center'
  },
  tabBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    textAlign:'center'
  },

}
