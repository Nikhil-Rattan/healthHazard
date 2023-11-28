import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Helpers } from 'App/Theme';
import TestMenuItem from 'App/Components/TestMenuItem';

class TestResultList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TestResultsExceptFirst: [],
    };
  }

  UpdatedtestresultsOfpatient() {
    let AllTestResultExpectfirst = this.props.testAllResults.slice(
      1,
      this.props.testAllResults.length,
    );
    this.setState({ TestResultsExceptFirst: AllTestResultExpectfirst });
  }

  _onPressItem(item) {
    this.props.onPressCard(item);
  }
  render() {
    return this.props.testAllResults.length ? (
      <View style={{ width: '100%' }}>
        <FlatList
          contentContainerStyle={this.props.listStyle}
          data={this.props.testAllResults}
          keyExtractor={(item) => {
            return item.PatientTestResultId;
          }}
          renderItem={({ item }) => {
            return item.ResultName === 'Positive' ? (
              <TestMenuItem
                key={item.PatientTestResultId}
                itemContainerStyle={[
                  Helpers.tabItemContainerStyle,
                  {
                    backgroundColor: 'white',
                    borderRadius: 20,
                    height: 90,
                    borderColor: 'transparent',
                    borderWidth: 0.2,
                    width: '100%',
                  },
                ]}
                imageContainerStyle={[
                  {
                    height: 60,
                    width: 60,
                    borderRadius: 10,
                    backgroundColor: '#f92a2a',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  },
                ]}
                leftImage={null}
                hasImage={false}
                digitdatecolor="white"
                textContainerStyle={[Helpers.tabItemTextContainerStyle]}
                headerTextStyle={[
                  Helpers.btnText,
                  Helpers.bold,
                  {
                    color: '#000000',
                    fontSize: 16,
                    textAlign: 'left',
                    marginLeft: 5,
                  },
                ]}
                parahgraphTextStyle={[
                  Helpers.btnText,
                  {
                    color: '#000000',
                    fontSize: 14,
                    textAlign: 'left',
                    marginLeft: 5,
                  },
                ]}
                headerText={
                  this.props.selectedMessage[
                  'CallScreen-' + item.ResultName + 'TestResults'
                  ]
                }
                parahgraphText={
                  this.props.selectedMessage[item.TestDateResultMonth] +
                  ' ' +
                  item.TestDateResultInfo
                }
                iconContainerStyle={[Helpers.tabItemIconContainerStyle]}
                dateNo={item.ResultDay}
                dateMonth={this.props.selectedMessage[item.ResultMonth]}
                onPressCard={this._onPressItem.bind(this, item)}></TestMenuItem>
            ) : item.ResultName === 'Negative' ? (
              <TestMenuItem
                key={item.PatientTestResultId}
                itemContainerStyle={[
                  Helpers.tabItemContainerStyle,
                  {
                    backgroundColor: 'white',
                    borderRadius: 20,
                    height: 90,
                    borderColor: 'transparent',
                    borderWidth: 0.2,
                    width: '100%',
                  },
                ]}
                imageContainerStyle={[
                  {
                    height: 60,
                    width: 60,
                    borderRadius: 10,
                    backgroundColor: '#28998D',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  },
                ]}
                leftImage={null}
                hasImage={false}
                digitdatecolor="white"
                textContainerStyle={[Helpers.tabItemTextContainerStyle]}
                headerTextStyle={[
                  Helpers.btnText,
                  Helpers.bold,
                  {
                    color: '#000000',
                    fontSize: 16,
                    textAlign: 'left',
                    marginLeft: 5,
                  },
                ]}
                parahgraphTextStyle={[
                  Helpers.btnText,
                  {
                    color: '#000000',
                    fontSize: 14,
                    textAlign: 'left',
                    marginLeft: 5,
                  },
                ]}
                headerText={
                  this.props.selectedMessage[
                  'CallScreen-' + item.ResultName + 'TestResults'
                  ]
                }
                parahgraphText={
                  this.props.selectedMessage[item.TestDateResultMonth] +
                  ' ' +
                  item.TestDateResultInfo
                }
                iconContainerStyle={[Helpers.tabItemIconContainerStyle]}
                dateNo={item.ResultDay}
                dateMonth={this.props.selectedMessage[item.ResultMonth]}
                onPressCard={this._onPressItem.bind(this, item)}></TestMenuItem>
            ) : (
              <TestMenuItem
                key={item.PatientTestResultId}
                itemContainerStyle={[
                  Helpers.tabItemContainerStyle,
                  {
                    backgroundColor: 'white',
                    borderRadius: 20,
                    height: 90,
                    borderColor: 'transparent',
                    borderWidth: 0.2,
                    width: '100%',
                  },
                ]}
                imageContainerStyle={[
                  {
                    height: 60,
                    width: 60,
                    borderRadius: 10,
                    backgroundColor: '#614698',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  },
                ]}
                leftImage={null}
                hasImage={false}
                digitdatecolor="white"
                textContainerStyle={[Helpers.tabItemTextContainerStyle]}
                headerTextStyle={[
                  Helpers.btnText,
                  Helpers.bold,
                  {
                    color: '#000000',
                    fontSize: 16,
                    textAlign: 'left',
                    marginLeft: 5,
                  },
                ]}
                parahgraphTextStyle={[
                  Helpers.btnText,
                  {
                    color: '#000000',
                    fontSize: 14,
                    textAlign: 'left',
                    marginLeft: 5,
                  },
                ]}
                headerText={
                  this.props.selectedMessage[
                  'CallScreen-' + item.ResultName + 'TestResults'
                  ]
                }
                parahgraphText={
                  this.props.selectedMessage[item.TestDateResultMonth] +
                  ' ' +
                  item.TestDateResultInfo
                }
                iconContainerStyle={[Helpers.tabItemIconContainerStyle]}
                dateNo={item.ResultDay}
                dateMonth={this.props.selectedMessage[item.ResultMonth]}
                onPressCard={this._onPressItem.bind(this, item)}></TestMenuItem>
            );
          }}
        />
        <View>
        </View>
      </View>
    ) : (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <Text
          style={[
            Helpers.mediumFont,
            { textAlign: 'center', color: 'gray', fontSize: 15 },
          ]}>
          {this.props.selectedMessage['SearchFacility-NoTestResults']}
        </Text>
      </View>
    );
  }
}

TestResultList.propTypes = {
  testAllResults: PropTypes.any,
  testAllResultsErrorMessage: PropTypes.string,
  isPatientProfileLoading: PropTypes.bool,
  onPressCard: PropTypes.func,
  listStyle: PropTypes.any,
  resetAllPatientStates: PropTypes.func,
  authenticatedUser: PropTypes.any,
  hasPatientId: PropTypes.bool,
  PatientId: PropTypes.number,
  selectedMessage: PropTypes.any,
};

TestResultList.defaultProps = {
  onPressCard: () => { },
  hasPatientId: true,
  PatientId: 0,
};

const mapStateToProps = (state) => ({
  testAllResultsErrorMessage: state.patientProfile.testAllResultsErrorMessage,
  isPatientProfileLoading: state.patientProfile.isPatientProfileLoading,
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TestResultList);
