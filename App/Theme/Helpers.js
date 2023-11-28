import { StyleSheet } from 'react-native'
import { Colors } from 'App/Theme'

export default StyleSheet.create({
  backgroundReset: {
    backgroundColor: Colors.transparent,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  colCenter: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  colCross: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  colMain: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  columnReverse: {
    flexDirection: 'column-reverse',
  },
  crossCenter: {
    alignItems: 'center',
  },
  crossEnd: {
    alignItems: 'flex-end',
  },
  crossStart: {
    alignItems: 'flex-start',
  },
  crossStretch: {
    alignItems: 'stretch',
  },
  fill: {
    flex: 1,
  },
  fillCenter: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  fillCenterMain: {
    flex: 1, alignContent: 'center'
  },
  fillCol: {
    flex: 1,
    flexDirection: 'column',
  },
  fillColCenter: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  fillColCross: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  fillColMain: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  fillColReverse: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  fillRow: {
    flex: 1,
    flexDirection: 'row',
  },
  fillRowCenter: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fillRowCross: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  fillRowMain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fillRowReverse: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  fullSize: {
    height: '100%',
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  mainCenter: {
    justifyContent: 'center',
  },
  mainEnd: {
    justifyContent: 'flex-end',
  },
  mainSpaceAround: {
    justifyContent: 'space-around',
  },
  mainSpaceBetween: {
    justifyContent: 'space-between',
  },
  mainStart: {
    justifyContent: 'flex-start',
  },
  mirror: {
    transform: [{ scaleX: -1 }],
  },
  rotate90: {
    transform: [{ rotate: '90deg' }],
  },
  rotate90Inverse: {
    transform: [{ rotate: '-90deg' }],
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowCross: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowMain: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  scrollSpaceAround: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  scrollSpaceBetween: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  selfStretch: {
    alignSelf: 'stretch',
  },
  textCenter: {
    textAlign: 'center',
  },
  textJustify: {
    textAlign: 'justify',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },


  txtInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#ececec',
    borderRadius: 5,
    width: '90%',
    height: 45,

    borderWidth: 1.5,
    marginBottom: 10,
    marginTop: 10,
    borderColor: '#a7a7a7'
  },

  txtAreaInputContainer: {

    backgroundColor: '#ececec',
    borderRadius: 5,
    width: '90%',
    height: 100,

    borderWidth: 1.5,
    marginBottom: 10,
    marginTop: 10,
    borderColor: '#a7a7a7'
  },
  RectangletxtInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: '90%',
    height: 52,
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    borderColor: '#CACACA'
  },
  ReactangletxtInputs: {
    height: 50,
    marginLeft: 16,
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    width: '75%',
    color: '#595959',
    flex: 1,
  },
  txtInputs: {
    height: 45,
    marginLeft: 16,
    fontSize: 19,
    color: '#595959',
    flex: 1,
  }
  ,
  formContainer: {
    width: '90%'
  },

  btnContainer: {
    height: 56,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  btnGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    borderRadius: 13,
    height: 55
  },
  bigBtnGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    borderRadius: 13,

    height: 55,
  },

  ReactanglebtnGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 8,
    height: 55
  },
  btn: {
    height: 55,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,

  },
  Rectanglebtn: {
    height: 55,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "white",
  },
  btnText: {
    fontFamily: "Poppins-Medium",
    color: "white",
    fontSize: 14,
    textAlign: 'center'
  },
  //akshay open
  SearchtextinputmainViewCss: {
    borderColor: '#1e9a8d',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  SearchMaintextInput: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    fontSize: 20,
    fontFamily: 'Brandon_bld'
  },
  inputIcon: {
    marginLeft: 15,

    justifyContent: 'center'
  },
  mainButton: {
    marginTop: 25,
    height: 50,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "white",
  },
  mainButtonText: {
    fontFamily: "Acephimere Bold",
    color: "#ee6769",
    fontSize: 25,
    fontWeight: 'bold',
  },

  marginequal10: {
    marginLeft: 10,
    marginRight: 10
  },
  name: {
    fontSize: 28,
    color: "#696969",

  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    color: "#696969",

  },
  Cardcenter: {
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 30,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowOffset: { width: 10, height: 10, },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    elevation: 15,
  },
  UserImage: {

    alignItems: 'center', resizeMode: 'cover', marginTop: 17, width: 170, height: 170
  },
  dailogImgstyle: {
    alignItems: 'center', resizeMode: "contain", marginTop: 17
  },
  Roundbuttongradient: {
    height: 160,
    width: 160,
    borderRadius: 160 / 2,
    marginBottom: 20,
  },
  RectangleGradient: {
    height: 160,
    width: '100%',
    marginBottom: 20,
  },
  roundbutton: {
    alignItems: 'center',
    height: 150, width: 150,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  icon: {
    height: 35, width: 35
  },
  iconsmall: {
    height: 25, width: 25
  },
  tabIcon: {
    height: 25, width: 25
  },
  marginequal100: {
    marginTop: 100,
    marginBottom: 100
  },

  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 10
  },
  Listcontainer: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  Listcontent: {
    marginLeft: 16,
    flex: 1,
  },
  ListcontentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  Listroot: {
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },

  bottomView: { // for bottom fix
    width: '100%',
    height: 70,
    backgroundColor: 'transparent',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  topView: { // for bottom fix
    width: '100%',
    height: 70,
    backgroundColor: 'transparent',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
  //akshay close


  errorMessage: {
    fontSize: 16,
    width: '90%',
    color: "red",
    textAlign: 'left'
  },
  logo: { height: 150, width: 200, marginTop: 10 },
  // Progress Container
  progressBarContainer: { backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingBottom: 50 },


  //Progress left Header Row
  headerLeftRow: {

    backgroundColor: 'red',
    height: 7,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    width: '20%'

  },
  //Progress right Header Row
  headerRightRow: {
    backgroundColor: 'grey',
    height: 7,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    width: '80%'
  }
  ,
  // Custom DDL PopUp DDL Container
  buttonContainer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.patientColor,
  },
  //Custom Input & Custom DDL PopUp && CustomDDL Container
  txtRoundInputContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    height: 50,
    borderWidth: 0.5,
    marginBottom: 5,
    borderColor: Colors.patientColor
  },
  txtRoundInputContainercity: {
    flexDirection: 'row',
    borderRadius: 8,
    height: 50,
    borderWidth: 0.8,
    borderColor: Colors.patientColor,
    marginTop: -12
  },
  // Custom Input && Custom DDL Popup txtRoundInputs
  txtRoundInputs: {
    height: 50,
    marginLeft: 16,
    fontSize: 13,
    color: Colors.patientColor,
    fontFamily: 'Poppins-Medium',
    flex: 1,
  },
  txtRoundInputcity: {
    height: 50,
    marginLeft: 16,
    fontSize: 9,
    color: Colors.patientColor,
    fontFamily: 'Poppins-Medium',
    flex: 1,
  },

  // Custom Input
  txtBoxFont: { fontSize: 15 },
  // Custom Input
  placeholderFont: { fontSize: 12 },
  // Custom Input && Custom DDL PopUp && Custom DDL Lable
  inputBoxLable: { fontSize: 12, color: Colors.patientColor, textAlign: 'left', width: '90%' },

  // Custom DDL PopUp rightIconStyle
  rightIconStyle: { height: 15, width: 18, marginVertical: 18, marginRight: 10, alignSelf: 'flex-end' },
  // Custom DDL PopUp
  popUpListContainerStyle: { paddingBottom: 50, paddingTop: 30 },
  // Custom DDL PopUp
  popUpTitletextStyle: { color: "white", fontStyle: 'normal', fontSize: 13 },
  // Custom DDL PopUp
  popUpTitleStyle: { backgroundColor: Colors.patientColor, },

  // Custom DDL PopUp
  popUpListItemStyle: { flexDirection: 'row', justifyContent: 'center', width: '100%', height: 50 },
  // Custom DDL PopUp
  popUpListItemTextStyle: { color: Colors.patientColor, fontSize: 16 },

  logo: { width: 200, height: 150, marginTop: 10 },
  logoLogin: { width: 150, height: 150, marginTop: 10 },
  Mainlogo: { marginTop: 10, width: 200, height: 200 },
  // Multi Button container
  multiButtonContainer: { backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-around', },
  // Multi Buttons button without background
  buttonContainerWithoutBackground: {
    width: '40%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#F92A2A',
    borderRadius: 13
  },
  // Multi Buttons Button Text without background cotainer
  buttonTextWithoutBackgroundContainer: { color: '#F92A2A', fontWeight: "bold", fontSize: 14 },
  //

  // Tab Container
  tabContainer: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: Colors.tabBackgroundColor,
    //borderWidth:2,
    // borderColor:"red",
  },

  //Mainlogo: { marginTop: 10 },
  PharmacyPic: { width: 100, height: 100, },
  PharmacyBigPic: { width: '100%', height: 320, },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 15
  },
  MediumBigicon: {
    height: 40, width: 40
  },
  Bigicon: {
    height: 50, width: 50
  },
  LargeBigicon: {
    height: 65, width: 65
  },

  // Test Menu Item CSS
  // Test Menu Item Container
  tabItemContainerStyle: { height: 70, width: '95%', backgroundColor: "transparent", borderRadius: 15, borderColor: 'black', flexDirection: 'row', borderWidth: 1, paddingLeft: 15, marginBottom: 20 },
  // Test Menu Item Image Container
  tabItemImageContainerStyle: { height: '100%', width: "20%", backgroundColor: "transparent", justifyContent: 'center', alignSelf: 'flex-start' },

  // Test Menu Item txt Container
  tabItemTextContainerStyle: { height: '100%', width: "60%", backgroundColor: "transparent", justifyContent: 'center', alignSelf: 'flex-start', marginLeft: 5 },
  // Test Menu Item headertxt Container
  tabItemHeaderTextStyle: { color: '#000000', fontSize: 14, textAlign: 'left', fontWeight: 'bold' },
  // Test Menu Item paragraphtxt Container
  tabItemParahgraphTextStyle: { color: '#414141', flexWrap: 'wrap', fontSize: 11, textAlign: 'left' },


  // Test Menu Item right icon Container
  tabItemIconContainerStyle: { height: '100%', backgroundColor: "transparent", justifyContent: 'center', alignItems: 'flex-end', width: "15%", marginRight: 5 },

  CardWithTwoOption: {
    borderRadius: 13,
    width: '95%',
    height: 55,

    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    //backgroundColor:'red'
  },
  CardText: { fontSize: 16, textAlign: 'left', width: '100%', flexWrap: 'wrap' },

  BoldTexttitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    color: '#333333',
    textAlign: 'left',
    width: '90%'
  },

  bold: {
    fontFamily: 'Poppins-Bold'
  },

  mediumFont: {
    fontFamily: 'Poppins-Medium'
  },
  lightFont: {
    fontFamily: 'Poppins-Light'
  },
  lightBook: {
    fontFamily: 'Poppins-Regular'
  },

  // Tab Container
  bottomTabStyle: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // borderRadius:100,
    backgroundColor: Colors.tabBackgroundColor,
    //borderWidth:2,
    // borderColor:"red",
  },
  PatientCard: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 13,
    shadowOffset: { width: 5, height: 5, },

    shadowOpacity: 0.1,
    shadowColor: '#614698',
    elevation: 21,
  },
  FacilityCardNew: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 13,
    shadowOffset: { width: 1, height: 1, },

    shadowOpacity: 0.5,
    shadowColor: '#614698',
    elevation: 3,
  },
  DashboardRow: {
    marginVertical: 20,

  },

  BottomTabShaddow: {
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: '#9B8487',
    elevation: 35,
  },
  scroll: {
    paddingTop: '15%',
    marginBottom: '35%'
  },
  mainlogoImg: {
    height: 80, width: 80
  },
  instructionsScreenMainHeading: {
    fontSize: 24,
    color: Colors.white,
    textAlign: 'left',
    paddingLeft: 8,
    paddingVertical: 5
  },
  instructionScreenHeadingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 15,
    backgroundColor: Colors.facilityColor,
  },
  instructionStepsmainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  numberCountTxt: {
    marginVertical: 10,
    fontSize: 15,
    color: Colors.Black,
    textAlign: 'left',
    marginRight: 10
  },
  instructionStepsTxt: {
    marginVertical: 10,
    fontSize: 16,
    color: Colors.Black,
    textAlign: 'left',
    width: '93%'
  }

})






