import React, { Component } from 'react';
import {
  StyleSheet,
  Text, Linking,
  View,
  TouchableHighlight, TouchableOpacity,
  Image, TextInput, FlatList,
  Alert, SearchBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions'
import { KeyboardAvoidingView } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { Colors, Fonts, Images, Metrics, Helpers, ApplicationStyles } from 'App/Theme'

import Dialog, { DialogContent } from 'react-native-popup-dialog';

import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import AuthenticateActions from 'App/Stores/Authentication/Actions'
import NavigationService from 'App/Services/NavigationService'
import ListCard from 'App/Components/ListCard';
import TopHeaderWithTwoOption from 'App/Components/TopHeaderWithTwoOption';
import CustomSearchTextbox from 'App/Components/CustomSearchTextbox';

class Pharmacylist extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = { searchvalue: '', IsCancelButton: false, FacilityList: [] };

  }
  componentDidMount() {


    this.props.resetAllFacilityStates()
    let payload = {
      "FacilityId": 0,
      "OrderBy": "asc",
      "OrderByColumn": "FacilityName",
      "PageSize": 250,
      "PageNo": 1,
      "SearchQuery": '',

    }
    this.props.getAllFacilityProfiles(payload)

  }

  componentWillUnmount() {



    let payload = {
      "FacilityId": 0,
      "OrderBy": "asc",
      "OrderByColumn": "FacilityName",
      "PageSize": 250,
      "PageNo": 1,
      "SearchQuery": " and (Zipcode='" + this.props.authenticatedUser?.ZipCode + "'" + "  or CityId=" + this.props.authenticatedUser?.CityId + " or State='" + this.props.authenticatedUser?.State + "')"

    }
    // console.log(payload)
    this.props.getAllFacilityProfiles(payload)
  }

  SearchTextChanged(text) {
    if (text != '') {
      this.setState({ searchvalue: text, IsCancelButton: true })
    }
    else {
      this.setState({ searchvalue: text, IsCancelButton: false })
    }
    // console.log(text)
    let { FacilityList } = this.state;
    let { allFacility } = this.props
    let filter = allFacility.filter(function (item) {
      return (item.FacilityName.toLowerCase().match(text.toString().toLowerCase())
        ||
        (item.Address ?? "").toLowerCase().match(text.toString().toLowerCase())
      );
    });
    if (text != '') {
      this.setState({ FacilityList: filter })

    }
    else {
      this.setState({ FacilityList: allFacility })

    }

  }

  componentDidUpdate(prevProps, prevState) {

    // console.log(this.props.allFacility.length)


    if ((prevProps.allFacility.length != this.props.allFacility.length)) {
      // console.log("reche")

      this.setState({ FacilityList: this.props.allFacility });


    }
  }
  getItemDetail(item) {

    // console.log( (item))
    NavigationService.navigate('PharmacyDetailsScreen', { itemDetail: item })

  }





  _OnClickCancel() {
    this.setState({ IsCancelButton: false, searchvalue: '' })
    this.props.resetAllFacilityStates()
    let payload = {
      "FacilityId": 0,
      "OrderBy": "asc",
      "OrderByColumn": "FacilityName",
      "PageSize": 250,
      "PageNo": 1,
      "SearchQuery": '',

    }
    this.props.getAllFacilityProfiles(payload)
  }
  _GoBack() {
    NavigationService.navigate('MainDashboard')
  }



  render() {


    return (
      <SafeAreaView style={[{ backgroundColor: 'white', flex: 1 }]}>



        <TopHeaderWithTwoOption
          HeaderTitle='Privacy Policy'
          fullComponentbackgroundColor={Colors.white}
          fullComponentHeight={91}
          RightHeaderTitle='Edit'
          IsImage={true}
          LeftImage={Images.PurPleBackIcon}
          RightImage={Images.BackIcon}
          RightSideTitleColor={Colors.patientColor}
          onPressLeftButton={this._GoBack.bind(this)}
        />





        <View style={{
          flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
          width: '100%', backgroundColor: 'transparent', height: 60, marginTop: 30
        }}>
          <View style={[{ flexDirection: 'row', justifyContent: 'center', backgroundColor: Colors.TooLightGray, width: '90%', borderRadius: 30 }, this.state.IsCancelButton ? { width: '70%' } : { width: '90%' }]}>
            <Image
              style={[
                Helpers.iconsmall,
                { marginLeft: 20, marginVertical: 15, tintColor: this.state.IsCancelButton ? "#000000" : "#D3DCE6" },
              ]}
              resizeMode="contain"
              source={Images.SearchIcon}
            />
            {/* {this.state.IsCancelButton?
        <Image style={[Helpers.iconsmall,{marginLeft:20,marginVertical:15}]} resizeMode='contain' source={Images.BlackSearchIcon} />

       :
       <Image style={[Helpers.iconsmall,{marginLeft:20,marginVertical:15}]} resizeMode='contain' source={Images.GraySearchIcon} />
} */}
            <TextInput
              style={{ height: 40, fontSize: 17, borderColor: 'gray', marginLeft: 10, width: '80%', marginTop: 3 }}

              placeholder={this.props.selectedMessage["SearchFacility-SearchTestingFacilities"]}
              onChangeText={this.SearchTextChanged.bind(this)}

              value={this.state.searchvalue}
            />

          </View>
          {this.state.IsCancelButton ?
            <TouchableOpacity onPress={this._OnClickCancel.bind(this)}>
              <Text style={[, { fontSize: 18, color: Colors.ErrorREdColor, textAlign: 'left', marginLeft: 20, marginTop: 0 }]}>
                {this.props.selectedMessage["FacProfile-Cancel"]}
              </Text>
            </TouchableOpacity> :
            null
          }

        </View>

        <Text style={[Helpers.mediumFont, { fontSize: 18, color: Colors.lightblack, textAlign: 'left', marginLeft: 20, marginTop: 35, marginBottom: 10 }]}>
          {this.props.selectedMessage["SearchFacility-NearbyTestingSites"]} ({this.state.FacilityList.length > 0 ? this.state.FacilityList.length : ''})
        </Text>



        <FlatList
          style={Helpers.Listroot}
          data={this.state.FacilityList}

          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item }) => {

            return (
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 25 }}>
                <ListCard
                  name={item.FacilityName}
                  address={item.Address}
                  distance={""}
                  getItemDetail={this.getItemDetail.bind(this, item)}
                />


              </View>

            );
          }} />

      </SafeAreaView>
    );
  }
}


Pharmacylist.propTypes = {



  allFacility: PropTypes.any,
  allFacilityErrorMessage: PropTypes.string,
  isFacilityProfileLoading: PropTypes.bool,
  authenticatedUser: PropTypes.any,
  getAllFacilityProfiles: PropTypes.func,
  resetAllFacilityStates: PropTypes.func,
  selectedMessage: PropTypes.any,
}


const mapStateToProps = (state) => ({
  allFacility: state.facilityProfile.allFacility,
  allFacilityErrorMessage: state.facilityProfile.allFacilityErrorMessage,
  isFacilityProfileLoading: state.facilityProfile.isFacilityProfileLoading,
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage,

})

const mapDispatchToProps = (dispatch) => ({
  getAllFacilityProfiles: (data) => dispatch(FacilityProfileActions.getAllFacilityProfiles(data)),
  resetAllFacilityStates: () => dispatch(FacilityProfileActions.resetAllFacilityStates()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pharmacylist)
const styles = StyleSheet.create({

}); 
