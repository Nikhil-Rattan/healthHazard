import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image, TextInput,
  ScrollView,
  SafeAreaView, FlatList, Platform
} from 'react-native';

import Telehealthexpertlist from 'App/Components/Telehealthexpertlist';
import ValidationComponent from 'react-native-form-validator';
import { Colors, Images, Helpers } from 'App/Theme'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions'
import NavigationService from 'App/Services/NavigationService'

class CertifiedTestersScreen extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchvalue: '',
      IsCancelButton: false,
      CertiFiedtesterList: [],
      Aftersearchnoresult: false,

      currentPage: 1,
      pageLimit: 10,
      allLoaded: false,
      SearchQuery: ' and FacilityUserId=' + this.props.authenticatedUser?.FacilityUserId
    };

  }
  componentDidMount() {
    this._getallCertifiedTesters()
  }
  componentWillUnmount() {
    this.props.closeFacilityProfileLoading()
  }

  _getallCertifiedTesters() {
    const { currentPage, pageLimit } = this.state;
    if (this.state.currentPage == 1) {
      this.props.resetAllCertifiedTestersStates();
    }
    let payload = {
      "FacilityId": 0,
      "OrderBy": "desc",
      "OrderByColumn": "ModifiedOn",
      "PageSize": pageLimit,
      "PageNo": currentPage,
      "SearchQuery": this.state.SearchQuery,
      // "SearchQuery": ' and FacilityUserId=' + this.props.authenticatedUser?.FacilityUserId + " and (first_name like 'albert' or last_name like 'albert' or email like 'albert' or first_name + ' ' + last_name like 'albert')",
      "FacilityUserId": this.props.authenticatedUser?.FacilityUserId,
      "LoginUserId": this.props.authenticatedUser?.UserId,
    }
    console.log("TESTERpayload", payload);
    this.props.getAllCertifiedTesters(payload)

  }

  getItemDetail(item) {
    this.props.resetTesterForEdit()
    this.props.getTesterForEditSuccess(item)

    NavigationService.navigate('EditTesterScreen')

  }

  async _OnClickCancel() {
    // this.setState({ IsCancelButton: false, searchvalue: '' })
    await this.setState({ allLoaded: false, currentPage: 1, Aftersearchnoresult: false, CertiFiedtesterList: [], SearchQuery: " and FacilityUserId=" + this.props.authenticatedUser?.FacilityUserId, IsCancelButton: false, searchvalue: '' });
    this._getallCertifiedTesters()
  }

  _GotoCreateNewTester() {

    NavigationService.navigate('CreateNewTesterScreen')
  }
  goToTop = () => {
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });
  }

  search_timer = 0;
  async SearchTextChanged(text) {
    if (text != '') {
      this.setState({ searchvalue: text, IsCancelButton: true });
      await this.setState({ allLoaded: false, currentPage: 1, Aftersearchnoresult: true, CertiFiedtesterList: [], SearchQuery: " and FacilityUserId=" + this.props.authenticatedUser?.FacilityUserId + " and (FirstName like '" + text + "' or LastName like '" + text + "' or Email like '" + text + "' or FullName like '" + text + "')" });
    }
    else {
      this.setState({ searchvalue: text, IsCancelButton: false });
      await this.setState({ allLoaded: false, currentPage: 1, Aftersearchnoresult: false, CertiFiedtesterList: [], SearchQuery: " and FacilityUserId=" + this.props.authenticatedUser?.FacilityUserId });
    }

    clearTimeout(this.search_timer);
    this.search_timer = setTimeout(async () => {
      this._getallCertifiedTesters();
    }, 200);
    // let { CertiFiedtesterList } = this.state;
    // let { certifiedAllTesters } = this.props
    // let filter = certifiedAllTesters.filter(function (item) {
    //   return (item.Email.toLowerCase().match(text.toString().toLowerCase())
    //     ||
    //     (item.FullName ?? "").toLowerCase().match(text.toString().toLowerCase())
    //   );
    // });
    // if (text != '') {
    //   this.setState({ CertiFiedtesterList: filter, Aftersearchnoresult: true })
    // }
    // else {
    //   this.setState({ CertiFiedtesterList: certifiedAllTesters, Aftersearchnoresult: false })
    // }
  }

  async componentDidUpdate(prevProps, prevState) {
    // if (this.props.certifiedAllTesters.length > 0 && prevProps.certifiedAllTesters.length != this.props.certifiedAllTesters.length) {
    const { CertiFiedtesterList, currentPage } = this.state;

    var isExist = false;
    if (this.props.certifiedAllTesters.length > 0) {
      isExist = CertiFiedtesterList.some(element => {
        if (element.FacilityTesterId === this.props.certifiedAllTesters[0].FacilityTesterId) {
          return true;
        }
      });
    }


    if (this.state.currentPage > 1 && this.props.certifiedAllTesters.length == 0 && (!this.state.allLoaded)) {
      await this.setState({ allLoaded: true });
    }

    if (this.props.certifiedAllTesters.length > 0) {
      if (CertiFiedtesterList.length == 0 && currentPage == 1) {
        console.log("\nAAAAAAAAAAA\n\n");
        this.setState({ CertiFiedtesterList: this.props.certifiedAllTesters });
      }
      else if (!isExist) {
        console.log("\nRRRRRRRRRRRR\n\n");
        this.setState({ CertiFiedtesterList: CertiFiedtesterList.concat(this.props.certifiedAllTesters) })
      }
    } else if (CertiFiedtesterList.length > 0 && !this.state.allLoaded) {
      console.log("\n\nClear", this.state.allLoaded, "\n\n",);
      this.setState({ CertiFiedtesterList: [] });
    }

    // if ((prevProps.certifiedAllTesters.length != this.props.certifiedAllTesters.length)) {
    //   this.setState({ CertiFiedtesterList: this.props.certifiedAllTesters });
    // }
  }
  onPressBack_Button() {
    NavigationService.popScreen()
  }

  _GoToTestermenuScreen(item) {
    NavigationService.navigate('TesterMenu', { itemDetail: item })
  }

  scroll_timer = 0;
  handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;

    clearTimeout(this.scroll_timer);
    this.scroll_timer = setTimeout(() => {
      const paddingToBottom = 200;
      if (
        layoutHeight + scrollPosition >= contentHeight - paddingToBottom &&
        (!this.state.allLoaded)
      ) {
        this.setState({ currentPage: this.state.currentPage + 1 })
        this._getallCertifiedTesters()
      }
    }, 200);
  };

  render() {
    return (
      <SafeAreaView style={[{ backgroundColor: 'white', flex: 1 }]}>
        <Dialog
          dialogStyle={{ backgroundColor: 'transparent' }}
          containerStyle={{ backgroundColor: 'transparent' }}
          style={{ backgroundColor: 'transparent' }}
          visible={this.props.isFacilityProfileLoading} >
          <DialogContent style={{ backgroundColor: 'transparent' }}>
            <View style={{ backgroundColor: 'transparent' }}>
              <Image
                source={Images.Loaderimg}
                style={{ alignItems: 'center', resizeMode: 'center', marginTop: 17 }}
              />
            </View>
          </DialogContent>
        </Dialog>

        {this.state.CertiFiedtesterList?.length > 0 ?
          <View style={[{
            height: 80, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center',
          }]}>
            <TouchableOpacity
              style={{ width: 46, height: 46, borderRadius: 46 / 2, marginLeft: 9, backgroundColor: '#f6f5fa', alignItems: 'center' }}
              onPress={this.onPressBack_Button.bind(this)}
            >
              <Image style={{ height: 17, width: 17, marginTop: 16 }} source={Images.GreenBackIcon} />
            </TouchableOpacity>
            <Text style={[styles.TiTleCss, { color: Colors.facilityColor, textAlign: 'center', marginTop: 0, fontFamily: 'gothamrounded-bold' }]}>
              {this.props.selectedMessage["NewTester-RegisteredTesters"]}

            </Text>
            {this.state.CertiFiedtesterList?.length > 0 ?
              <TouchableOpacity
                style={{ width: 46, height: 46, borderRadius: 46 / 2, marginLeft: 9, backgroundColor: 'transparent', alignItems: 'center' }}
                onPress={this._GotoCreateNewTester.bind(this)}
              >
                <Image style={{ height: 25, width: 25, marginTop: 12 }} source={Images.plusGreenIcon} />
              </TouchableOpacity>

              :
              <Text style={[styles.TiTleCss, { color: Colors.white, textAlign: 'center', marginRight: 10, fontFamily: 'gothamrounded-bold' }]}>.... </Text>
            }

          </View>
          :

          <View style={[{
            height: 80, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center',
            shadowOffset: { width: Platform.OS === 'ios' ? 15 : 10, height: 10, },
            shadowColor: Platform.OS === 'ios' ? '#E5E5E5' : 'black',
            shadowOpacity: Platform.OS === 'ios' ? 0.5 : 1.0,
            elevation: 15,
          }]}>
            <TouchableOpacity
              style={{ width: 46, height: 46, borderRadius: 46 / 2, marginLeft: 9, backgroundColor: '#f6f5fa', alignItems: 'center' }}
              onPress={this.onPressBack_Button.bind(this)}
            >
              <Image style={{ height: 17, width: 17, marginTop: 16 }} source={Images.GreenBackIcon} />
            </TouchableOpacity>
            <Text style={[styles.TiTleCss, { color: Colors.facilityColor, textAlign: 'center', marginTop: 0, fontFamily: 'gothamrounded-bold' }]}>
              {this.props.selectedMessage["NewTester-RegisteredTesters"]}

            </Text>
            {this.state.CertiFiedtesterList?.length > 0 ?
              <TouchableOpacity
                style={{ width: 46, height: 46, borderRadius: 46 / 2, marginLeft: 9, backgroundColor: 'transparent', alignItems: 'center' }}
                onPress={this._GotoCreateNewTester.bind(this)}
              >
                <Image style={{ height: 25, width: 25, marginTop: 12 }} source={Images.plusGreenIcon} />
              </TouchableOpacity>

              :
              <Text style={[styles.TiTleCss, { color: Colors.white, textAlign: 'center', marginRight: 10, fontFamily: 'gothamrounded-bold' }]}>.... </Text>
            }

          </View>
        }

        <ScrollView ref={(c) => { this.scroll = c }} onScroll={this.handleScroll}>
          {this.state.CertiFiedtesterList?.length > 0 ?

            <View>
              <View style={{
                flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                width: '100%', backgroundColor: 'transparent', height: 60, marginTop: 30
              }}>
                <View style={[{ flexDirection: 'row', borderColor: '#D3DCE6', borderWidth: 1, justifyContent: 'center', backgroundColor: 'transparent', width: '90%', borderRadius: 10 }, this.state.IsCancelButton ? { width: '70%' } : { width: '90%' }]}>
                  <Image style={[Helpers.iconsmall, { marginLeft: 20, marginVertical: 15, tintColor: this.state.IsCancelButton ? "#000000" : "#D3DCE6" }]} resizeMode='contain' source={Images.SearchIcon} />
                  {/* {this.state.IsCancelButton ?
                    <Image style={[Helpers.iconsmall, { marginLeft: 20, marginVertical: 15 }]} resizeMode='contain' source={Images.BlackSearchIcon} />

                    :
                    <Image style={[Helpers.iconsmall, { marginLeft: 20, marginVertical: 15 }]} resizeMode='contain' source={Images.GraySearchIcon} />
                  } */}
                  <TextInput
                    style={{ height: 40, fontSize: 17, borderColor: 'gray', marginLeft: 10, width: '80%', marginTop: 9 }}
                    onChangeText={this.SearchTextChanged.bind(this)}
                    placeholder={this.props.selectedMessage["TesterProfile-Tester"]}


                    value={this.state.searchvalue}
                  />

                </View>
                {this.state.IsCancelButton ?
                  <TouchableOpacity onPress={this._OnClickCancel.bind(this)}>
                    <Text style={[, { fontSize: 18, color: '#152C52', textAlign: 'left', marginLeft: 20, marginTop: 0 }]}>
                      {this.props.selectedMessage["TestResult-Cancel"]}
                    </Text>
                  </TouchableOpacity> :
                  null
                }

              </View>

              <FlatList
                style={Helpers.Listroot}
                data={this.state.CertiFiedtesterList}

                maxToRenderPerBatch={this.state.pageLimit}
                windowSize={this.state.pageLimit}

                keyExtractor={(item) => {
                  return item.id;
                }}
                renderItem={({ item }) => {

                  return (
                    <Telehealthexpertlist
                      backgroundColorContainer='#eff2f7'
                      DiscriptionColor='#3a295c'
                      TitleColor='#152c52'
                      TitleText={item.FullName}
                      DescriptionText={item.Email}
                      IconClick={this._GoToTestermenuScreen.bind(this, item)}
                    />
                  );
                }} />
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%', marginBottom: 25 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Image style={[{ height: 100, width: 100, marginTop: 100 }]} resizeMode='contain' source={Images.TesterListend} />
                </View>
                <Text style={[Helpers.mediumFont, { fontSize: 18, color: Colors.facilityColor, textAlign: 'center', marginTop: 20 }]}>
                  {this.props.selectedMessage["NewTester-EndOfSearchingResults"]}
                </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

                  <TouchableOpacity style={[Helpers.btn, { height: 50, width: '65%', backgroundColor: 'rgba(88, 150, 138, 0.1)' }]}
                    onPress={this.goToTop}
                  >
                    <Text style={[Helpers.btnText, { color: Colors.facilityColor, fontSize: 17, }]}>
                      {this.props.selectedMessage["NewTester-BacktoTheTop"]}
                    </Text>
                  </TouchableOpacity>

                </View>
              </View>

            </View>
            :
            this.state.Aftersearchnoresult ?
              <View>
                <View style={{
                  flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                  width: '100%', backgroundColor: 'transparent', height: 60, marginTop: 30
                }}>
                  <View style={[{ flexDirection: 'row', borderColor: '#D3DCE6', borderWidth: 1, justifyContent: 'center', backgroundColor: 'transparent', width: '90%', borderRadius: 10 }, this.state.IsCancelButton ? { width: '70%' } : { width: '90%' }]}>
                    <Image style={[Helpers.iconsmall, { marginLeft: 20, marginVertical: 15, tintColor: this.state.IsCancelButton ? "#000000" : "#D3DCE6" }]} resizeMode='contain' source={Images.SearchIcon} />
                    {/* {this.state.IsCancelButton ?
                      <Image style={[Helpers.iconsmall, { marginLeft: 20, marginVertical: 15 }]} resizeMode='contain' source={Images.BlackSearchIcon} />

                      :
                      <Image style={[Helpers.iconsmall, { marginLeft: 20, marginVertical: 15 }]} resizeMode='contain' source={Images.GraySearchIcon} />
                    } */}
                    <TextInput
                      style={{ height: 40, fontSize: 17, borderColor: 'gray', marginLeft: 10, width: '80%', marginTop: 9 }}
                      onChangeText={this.SearchTextChanged.bind(this)}
                      placeholder={this.props.selectedMessage["TesterProfile-Tester"]}


                      value={this.state.searchvalue}
                    />

                  </View>
                  {this.state.IsCancelButton ?
                    <TouchableOpacity onPress={this._OnClickCancel.bind(this)}>
                      <Text style={[, { fontSize: 18, color: '#152C52', textAlign: 'left', marginLeft: 20, marginTop: 0 }]}>
                        {this.props.selectedMessage["TestResult-Cancel"]}
                      </Text>
                    </TouchableOpacity> :
                    null
                  }

                </View>

                <Image style={[{ height: 100, width: 100, marginTop: 100, alignSelf: 'center' }]} resizeMode='contain' source={Images.Aftersearchnotesters} />


                <Text style={[Helpers.mediumFont, { fontSize: 18, color: '#3A295C', textAlign: 'center', marginTop: 20 }]}>
                  {this.props.selectedMessage["NewTester-TesterNotExist"]}
                </Text>


                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
                  <TouchableOpacity style={{ width: '65%', }} onPress={this._GotoCreateNewTester.bind(this)}>
                    <View style={{
                      width: '100%', height: 45, flexDirection: 'row', borderRadius: 9, backgroundColor: 'rgba(88, 150, 138, 0.1)', justifyContent: 'center', alignItems: 'center',
                    }}>
                      <Text style={[Helpers.mediumFont, { fontSize: 15, color: Colors.facilityColor, textAlign: 'center', width: '90%' }]}>
                        {this.props.selectedMessage["NewTester-CreateCertifiedTester"]}

                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              :
              <View>
                <Image style={[{ height: 100, width: 100, marginTop: 100, alignSelf: 'center' }]} resizeMode='contain' source={Images.NoTestersAdded} />

                <Text style={[Helpers.mediumFont, { fontSize: 21, marginLeft: 15, marginTop: 20, color: Colors.facilityColor, textAlign: 'center', width: '90%' }]}>
                  {this.props.selectedMessage["NewTester-NoRegisteredTester"]}

                </Text>

                <Text style={[Helpers.mediumFont, { fontSize: 16, marginLeft: 15, color: '#152C52', textAlign: 'center', width: '90%' }]}>
                  {this.props.selectedMessage["NewTester-AddNewTesterOrRegister"]}
                </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
                  <TouchableOpacity style={{ width: '65%', }} onPress={this._GotoCreateNewTester.bind(this)}>
                    <View style={{
                      width: '100%', height: 45, flexDirection: 'row', borderRadius: 9, backgroundColor: 'rgba(88, 150, 138, 0.1)', justifyContent: 'center', alignItems: 'center',
                    }}>
                      <Text style={[Helpers.mediumFont, { fontSize: 15, color: Colors.facilityColor, textAlign: 'center', width: '90%' }]}>
                        {this.props.selectedMessage["NewTester-AddNewTesterRegistered"]}

                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
}

CertifiedTestersScreen.propTypes = {
  certifiedAllTesters: PropTypes.any,
  allFacilityErrorMessage: PropTypes.string,
  isFacilityProfileLoading: PropTypes.bool,
  authenticatedUser: PropTypes.any,
  getAllCertifiedTesters: PropTypes.func,
  resetAllCertifiedTestersStates: PropTypes.func,
  selectedMessage: PropTypes.any,
  getTesterForEditSuccess: PropTypes.func,
  resetTesterForEdit: PropTypes.func,
  closeFacilityProfileLoading: PropTypes.func,
}


const mapStateToProps = (state) => ({
  certifiedAllTesters: state.facilityProfile.certifiedAllTesters,
  allFacilityErrorMessage: state.facilityProfile.certifiedAllTestersErrorMessage,
  isFacilityProfileLoading: state.facilityProfile.isFacilityProfileLoading,
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage

})

const mapDispatchToProps = (dispatch) => ({
  getAllCertifiedTesters: (data) => dispatch(FacilityProfileActions.getAllCertifiedTesters(data)),
  getTesterForEditSuccess: (data) => dispatch(FacilityProfileActions.getTesterForEditSuccess(data)),
  resetTesterForEdit: () => dispatch(FacilityProfileActions.resetTesterForEdit()),
  resetAllCertifiedTestersStates: () => dispatch(FacilityProfileActions.resetAllCertifiedTestersStates()),
  closeFacilityProfileLoading: () => dispatch(FacilityProfileActions.closeFacilityProfileLoading()),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CertifiedTestersScreen)

const styles = StyleSheet.create({

  TiTleCss: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'left',
  },
});

