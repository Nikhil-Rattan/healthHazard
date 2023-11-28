import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Linking,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Alert,
  SearchBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeaderNew from 'App/Components/CustomHeaderNew';
import Telehealthexpertlist from 'App/Components/Telehealthexpertlist';
import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions';
import { KeyboardAvoidingView } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import {
  Colors,
  Fonts,
  Images,
  Metrics,
  Helpers,
  ApplicationStyles,
} from 'App/Theme';

import Dialog, { DialogContent } from 'react-native-popup-dialog';

import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';
import ListCard from 'App/Components/ListCard';
import TopHeaderWithTwoOption from 'App/Components/TopHeaderWithTwoOption';
import CustomSearchTextbox from 'App/Components/CustomSearchTextbox';

class TestingSitesListsScreen extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchvalue: '',
      IsCancelButton: false,
      FacilityList: [],
      SearchQuery: '',

      currentPage: 1,
      pageLimit: 10,
      allLoaded: false,
    };
  }
  componentDidMount() {
    this._getRecords();
  }

  componentWillUnmount() {
    //   let payload={
    //     "FacilityId":0,
    //     "OrderBy":"asc",
    //     "OrderByColumn":"FacilityName",
    //     "PageSize" :250,
    //     "PageNo" :1,
    //     "SearchQuery" :" and (Zipcode='"+ this.props.authenticatedUser?.ZipCode+"'"+"  or CityId="+this.props.authenticatedUser?.CityId+" or State='"+this.props.authenticatedUser?.State+"')"

    //   }
    //     // console.log(payload)
    // this.props.getAllFacilityProfiles(payload)
    this.props.resetAllFacilityStates();
  }

  _getRecords() {
    if (this.state.currentPage == 1)
      this.props.resetAllFacilityStates();
    let Searchpayload = {
      FacilityId: 0,
      OrderBy: 'asc',
      OrderByColumn: 'FacilityName',
      PageSize: this.state.pageLimit,
      PageNo: this.state.currentPage,
      SearchQuery: this.state.SearchQuery != '' ? this.state.SearchQuery :
        " and (Zipcode='" + this.props.authenticatedUser?.ZipCode + "'" +
        '  or CityId=' + this.props.authenticatedUser?.CityId +
        " or State='" + this.props.authenticatedUser?.State + "')"
    };
    console.log("Searchpayload", Searchpayload)
    // alert(JSON.stringify(Searchpayload));
    this.props.getAllFacilityProfiles(Searchpayload);

    // let payload = {
    //   FacilityId: 0,
    //   OrderBy: 'asc',
    //   OrderByColumn: 'FacilityName',
    //   PageSize: this.state.pageLimit,
    //   PageNo: this.state.currentPage,
    //   SearchQuery:
    //     " and (Zipcode='" +
    //     this.props.authenticatedUser?.ZipCode +
    //     "'" +
    //     '  or CityId=' +
    //     this.props.authenticatedUser?.CityId +
    //     " or State='" +
    //     this.props.authenticatedUser?.State +
    //     "')",
    // };
    // this.props.getNearByFacility(payload);
  }

  search_timer = 0;
  SearchTextChanged(text) {
    if (text != '') {
      this.setState({
        searchvalue: text,
        IsCancelButton: true,
        Issearching: true,
      });
    } else {
      this.setState({
        searchvalue: text,
        IsCancelButton: false,
        Issearching: false,
      });
    }


    clearTimeout(this.search_timer);
    this.search_timer = setTimeout(async () => {
      await this.setState({
        currentPage: 1,
        allLoaded: false,
        FacilityList: [],
        SearchQuery:
          " and FacilityName like '%" +
          text +
          "%' or Address like '%" +
          text +
          "%'",
      });
      this._getRecords();
    }, 300);
    // console.log(text)
    // let { FacilityList } = this.state;
    // let { allFacility } = this.props;
    // let filter = allFacility.filter(function (item) {
    //   return (
    //     item.FacilityName.toLowerCase().match(text.toString().toLowerCase()) ||
    //     (item.Address ?? '').toLowerCase().match(text.toString().toLowerCase())
    //   );
    // });
    // if (text != '') {
    //   this.setState({ FacilityList: filter });
    // } else {
    //   this.setState({ FacilityList: allFacility });
    // }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { FacilityList, currentPage } = this.state;

    var isExist = false;
    if (this.props.allFacility.length > 0) {
      isExist = FacilityList.some(element => {
        if (element.FacilityUserId === this.props.allFacility[0].FacilityUserId) {
          return true;
        }
      });
    }

    if (this.state.currentPage > 1 && this.props.allFacility.length == 0 && (!this.state.allLoaded)) {
      await this.setState({ allLoaded: true });
    }

    console.log("SitesListData", FacilityList.length, FacilityList);
    if (this.props.allFacility.length > 0) {
      if (FacilityList.length == 0 && currentPage == 1) {
        this.setState({ FacilityList: this.props.allFacility });
      }
      else if (!isExist) {
        this.setState({ FacilityList: FacilityList.concat(this.props.allFacility) })
      }
    } else if (FacilityList.length > 0 && !this.state.allLoaded) {
      this.setState({ FacilityList: [] });
    }
    // if (prevProps.allFacility.length != this.props.allFacility.length) {
    //   this.setState({ FacilityList: this.props.allFacility });
    // }
  }

  scroll_timer = 0;
  handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;

    clearTimeout(this.scroll_timer);
    this.scroll_timer = setTimeout(() => {
      const paddingToBottom = 100;
      if (
        layoutHeight + scrollPosition >= contentHeight - paddingToBottom &&
        (!this.state.allLoaded)
      ) {
        this.setState({ currentPage: this.state.currentPage + 1 });
        this._getRecords();
      }
    }, 200);
  };

  getItemDetail(item) {
    // console.log( (item))
    NavigationService.navigate('PharmacyDetailsScreen', { itemDetail: item });
  }

  async _OnClickCancel() {
    await this.setState({
      IsCancelButton: false, searchvalue: '', Issearching: false, currentPage: 1,
      allLoaded: false, FacilityList: [], SearchQuery: ''
    });
    this._getRecords();
    // this.setState({FacilityList: this.props.allFacility});
  }
  _GoBack() {
    NavigationService.navigate('MainDashboard');
  }

  goToTop = () => {
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });
  };
  _OnClickCrossButton() {
    NavigationService.popScreen();
  }

  _SeePharmacyDetails(item) {
    NavigationService.navigate('PharmacyDetail', { itemDetail: item });
  }

  render() {
    return (
      <SafeAreaView style={[{ backgroundColor: '#fbfbfc', flex: 1 }]}>
        <Dialog
          dialogStyle={{ backgroundColor: 'transparent' }}
          containerStyle={{ backgroundColor: 'transparent' }}
          style={{ backgroundColor: 'transparent' }}
          visible={this.props.isFacilityProfileLoading}>
          <DialogContent style={{ backgroundColor: 'transparent' }}>
            <View style={{ backgroundColor: 'transparent' }}>
              <Image
                source={Images.Loaderimg}
                style={{
                  alignItems: 'center',
                  resizeMode: 'center',
                  marginTop: 17,
                }}
              />
            </View>
          </DialogContent>
        </Dialog>
        {/* <TopHeaderWithTwoOption
                HeaderTitle='Privacy Policy'
                fullComponentbackgroundColor={Colors.white}
                fullComponentHeight={91}
                RightHeaderTitle='Edit'
                IsImage={true}
                LeftImage={Images.PurPleBackIcon}
                RightImage={Images.BackIcon}
                RightSideTitleColor={Colors.patientColor}
                onPressLeftButton={this._GoBack.bind(this)}
                 /> */}

        <CustomHeaderNew
          HeaderColor={{ backgroundColor: Colors.white }}
          onPressBackButton={this._OnClickCrossButton.bind(this)}
          //  HeaderTitle={this.props.selectedMessage["EULA-EndUserLicenceAgreement"]}
          HeaderTitle={
            this.props.selectedMessage['TestingSiteListScreen-FindATestingSite']
          }
          LeftImage={Images.PurPleBackIcon}
          textcolorHeader="#614698"
        />

        <ScrollView
          ref={(c) => {
            this.scroll = c;
          }} onScroll={this.handleScroll}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              backgroundColor: 'transparent',
              height: 60,
              marginTop: 30,
            }}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  width: '90%',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#D3DCE6',
                },
                this.state.IsCancelButton ? { width: '70%' } : { width: '95%' },
              ]}>
              {
                <Image
                  style={[
                    Helpers.iconsmall,
                    { marginLeft: 20, marginVertical: 15 },
                  ]}
                  resizeMode="contain"
                  source={Images.NewSearchIcon}
                />
              }
              <TextInput
                style={[
                  {
                    height: 40,
                    fontSize: 17,
                    borderColor: 'gray',
                    marginLeft: 10,
                    width: '90%',
                    marginTop: 9,
                    color: Colors.BlueColorNew,
                  },
                ]}
                placeholderTextColor="#7B8BB2"
                //placeholder={this.props.selectedMessage["SearchFacility-SearchTestingFacilities"]}
                placeholder={
                  this.props.selectedMessage[
                  'TestingSiteListScreen-TextingSiteSearch'
                  ]
                }
                onChangeText={this.SearchTextChanged.bind(this)}
                value={this.state.searchvalue}
              />
            </View>
            {this.state.IsCancelButton ? (
              <TouchableOpacity onPress={this._OnClickCancel.bind(this)}>
                <Text
                  style={[
                    ,
                    {
                      fontSize: 18,
                      color: Colors.BlueColorNew,
                      textAlign: 'left',
                      marginLeft: 20,
                      marginTop: 0,
                    },
                  ]}>
                  {this.props.selectedMessage['FacProfile-Cancel']}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>

          {this.state.Issearching ? (
            <View>
              <Text
                style={[
                  Helpers.mediumFont,
                  {
                    fontSize: 18,
                    color: Colors.lightblack,
                    textAlign: 'left',
                    marginLeft: 20,
                    marginTop: 35,
                    marginBottom: 10,
                  },
                ]}>
                {/* { this.props.selectedMessage["SearchFacility-NearbyTestingSites"] } ({this.state.FacilityList.length>0?this.state.FacilityList.length:''})  */}
                {this.props.selectedMessage['NewTesters-SearchResults']} ({' '}
                {this.state.FacilityList.length} )
              </Text>

              <FlatList
                style={[Helpers.Listroot, { flex: 1 }]}
                data={this.state.FacilityList}
                keyExtractor={(item) => {
                  return item.id;
                }}
                maxToRenderPerBatch={this.state.pageLimit}
                windowSize={this.state.pageLimit}
                renderItem={({ item }) => {
                  return (
                    <View style={{ marginTop: 10 }}>
                      <Telehealthexpertlist
                        backgroundColorContainer="#efedf5"
                        ListRightImage={Images.purplelocationIcon}
                        DiscriptionColor="#000000"
                        TitleColor={Colors.patientColor}
                        TitleText={item.FacilityName}
                        DescriptionText={item.Address}
                        IconClick={this._SeePharmacyDetails.bind(this, item)}
                      />
                    </View>
                  );
                }}
              />

              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  width: '100%',
                  marginBottom: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={[{ height: 100, width: 100, marginTop: 100 }]}
                    resizeMode="contain"
                    source={Images.NofacilityNearbyIcon}
                  />
                </View>
                <Text
                  style={[
                    Helpers.bold,
                    {
                      fontSize: 25,
                      color: Colors.patientColor,
                      textAlign: 'center',
                      marginTop: 20,
                    },
                  ]}>
                  {/* End of Search Results */}
                  {
                    Object.keys(this.state.FacilityList).length ? this.props.selectedMessage['FacilitiesPatientList-EndofSearchResults'] : this.props.selectedMessage['FacilitiesPatientList-SearchResult']
                  }
                </Text>
                {Object.keys(this.state.FacilityList).length > 0 &&
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: 10,
                      marginBottom: 20,
                    }}>
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#efedf5', '#efedf5', '#efedf5']}
                      style={[
                        Helpers.bigBtnGradient,
                        { width: '75%', height: 50 },
                      ]}>
                      <TouchableOpacity
                        style={[Helpers.btn, { height: 50, marginBottom: 20 }]}
                        //  onPress={this._onPressButton.bind(this)}
                        onPress={this.goToTop}>
                        <Text
                          style={[
                            Helpers.btnText,
                            { color: Colors.patientColor, fontSize: 17 },
                          ]}>
                          {this.props.selectedMessage['NewTester-BacktoTheTop']}
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>}
              </View>
            </View>
          ) : <>
            <Text
              style={[
                Helpers.bold,
                {
                  fontSize: 22,
                  color: Colors.BlueColorNew,
                  textAlign: 'left',
                  marginLeft: 20,
                  marginTop: 35,
                  marginBottom: 10,
                },
              ]}>
              {this.props.selectedMessage['SearchFacility-NearbyTestingSites']} (
              {this.state.FacilityList.length > 0
                ? this.state.FacilityList.length
                : '0'}
              )
            </Text>

            <FlatList
              style={Helpers.Listroot}
              data={this.state.FacilityList}
              keyExtractor={(item) => {
                return item.id;
              }}
              maxToRenderPerBatch={this.state.pageLimit}
              windowSize={this.state.pageLimit}
              renderItem={({ item }) => {
                return (
                  <View style={{ marginTop: 10 }}>
                    <Telehealthexpertlist
                      backgroundColorContainer="#eff2f7"
                      ListRightImage={Images.DirectionSignIcon}
                      DiscriptionColor="#3a295c"
                      TitleColor="#152c52"
                      TitleText={item.FacilityName}
                      DescriptionText={item.Address}
                      IconClick={this._SeePharmacyDetails.bind(this, item)}
                    />
                  </View>
                );
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
                marginBottom: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={[{ height: 100, width: 100, marginTop: 100 }]}
                  resizeMode="contain"
                  source={Images.NofacilityNearbyIcon}
                />
              </View>
              <Text
                style={[
                  Helpers.bold,
                  {
                    fontSize: 25,
                    color: Colors.patientColor,
                    textAlign: 'center',
                    marginTop: 20,
                  },
                ]}>
                {
                  Object.keys(this.state.FacilityList).length ? this.props.selectedMessage['FacilitiesPatientList-EndofSearchResults'] : this.props.selectedMessage['FacilitiesPatientList-SearchResult']
                }
              </Text>
              {Object.keys(this.state.FacilityList).length > 0 &&
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#efedf5', '#efedf5', '#efedf5']}
                    style={[Helpers.bigBtnGradient, { width: '75%', height: 50 }]}>
                    <TouchableOpacity
                      style={[Helpers.btn, { height: 50 }]}
                      //  onPress={this._onPressButton.bind(this)}
                      onPress={this.goToTop}>
                      <Text
                        style={[
                          Helpers.btnText,
                          { color: Colors.patientColor, fontSize: 17 },
                        ]}>
                        {this.props.selectedMessage['NewTester-BacktoTheTop']}
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>}
            </View>
          </>}

          {/* <View style={{flexDirection:'column',justifyContent:'center',width:'100%'}}>
     <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
     <Image style={[{height:100,width:100,marginTop:100}]} resizeMode='contain' source={Images.NofacilityNearbyIcon} />
     </View>
     <Text style={[Helpers.mediumFont,{fontSize:18,color:Colors.patientColor,textAlign:'center',marginTop:20}]}>
     Find A Nearby Testing Facility 
        </Text>
 
        <Text style={[Helpers.mediumFont,{fontSize:12,color:Colors.Black,textAlign:'center',marginTop:20}]}>
        Try searching by name, zip code or address. 
        </Text>
 </View> */}

          {/* <FlatList
        style={Helpers.Listroot}
        data={this.state.FacilityList}
      
        keyExtractor={(item)=>{
          return item.id;
        }}
        renderItem={({item}) => {
          
          return(
<View style={{flexDirection:'row',justifyContent:'center',marginTop:10,marginBottom:25}}>
<ListCard
 name={item.FacilityName}
address={item.Address}
distance={""}
getItemDetail={this.getItemDetail.bind(this,item)}
/>
 

</View>

  );
}}/>   */}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

TestingSitesListsScreen.propTypes = {
  allFacility: PropTypes.any,
  allFacilityErrorMessage: PropTypes.string,
  isFacilityProfileLoading: PropTypes.bool,
  authenticatedUser: PropTypes.any,
  getAllFacilityProfiles: PropTypes.func,

  getNearByFacility: PropTypes.any,
  allNearByErrorMessage: PropTypes.string,
  allNearByFacility: PropTypes.any,

  resetAllFacilityStates: PropTypes.func,
  resetAllNearByFacilityStates: PropTypes.func,
  selectedMessage: PropTypes.any,
};

const mapStateToProps = (state) => ({
  allFacility: state.facilityProfile.allFacility,
  allFacilityErrorMessage: state.facilityProfile.allFacilityErrorMessage,

  allNearByFacility: state.facilityProfile.allNearByFacility,
  allNearByErrorMessage: state.facilityProfile.allNearByErrorMessage,

  isFacilityProfileLoading: state.facilityProfile.isFacilityProfileLoading,
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage,
});

const mapDispatchToProps = (dispatch) => ({
  getAllFacilityProfiles: (data) =>
    dispatch(FacilityProfileActions.getAllFacilityProfiles(data)),
  getNearByFacility: (data) =>
    dispatch(FacilityProfileActions.getNearByFacility(data)),

  resetAllFacilityStates: () =>
    dispatch(FacilityProfileActions.resetAllFacilityStates()),
  resetAllNearByFacilityStates: () =>
    dispatch(FacilityProfileActions.resetAllNearByFacilityStates()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TestingSitesListsScreen);
const styles = StyleSheet.create({});
