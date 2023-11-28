import React, { Component } from 'react';
import {
    StyleSheet,
    View, Image,
    ScrollView, TouchableOpacity
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors, Images, ApplicationStyles } from 'App/Theme';
import PhoneLoginScreen from 'App/Container/Authentication/PhoneLoginScreen'
import loginScreen from 'App/Container/Authentication/loginScreen'
import PhoneSignupScreen from 'App/Container/Authentication/PhoneSignupScreen';
import SignUp from 'App/Container/Authentication/SignUp';
import { connect } from 'react-redux';

const Tab = createMaterialTopTabNavigator();
class LoginWithPhoneOREmail extends Component {
    _onBackPress() {
        this.props.navigation.goBack();
    }
    render() {
        const isFromLogin = this.props.route.params;
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={[styles.header]}>
                    <TouchableOpacity
                        style={[styles.backBtn]}
                        onPress={this._onBackPress.bind(this)}
                    >
                        <Image style={[styles.backBtnImg]} source={Images.PurPleBackIcon} />
                    </TouchableOpacity>
                    <View style={[styles.imageContainer]}>
                        <Image
                            style={styles.headerLogo}
                            resizeMode="cover"
                            source={Images.MainLogo}
                        />
                    </View>
                </View>
                <Tab.Navigator
                    tabBarOptions={{
                        upperCaseLabel: false,
                        activeTintColor: Colors.patientColor,
                        inactiveTintColor: Colors.White,
                        indicatorStyle: {
                            borderBottomColor: Colors.patientColor,
                            borderBottomWidth: 3,
                        },
                        labelStyle: {
                            fontSize: 16,
                            fontFamily: 'Poppins-Medium'
                        }

                    }}
                >
                    {isFromLogin ?
                        <>
                            <Tab.Screen name={this.props.selectedMessage['AccountLogin-WithMobile']} component={PhoneLoginScreen} />
                            <Tab.Screen name={this.props.selectedMessage['AccountLogin-WithEmail']} component={loginScreen} />
                        </>
                        :
                        <>
                            <Tab.Screen name={this.props.selectedMessage['Register-SignUp-WithMobile']} component={PhoneSignupScreen} />
                            <Tab.Screen name={this.props.selectedMessage['Register-SignUp-WithEmail']} component={SignUp} />
                        </>
                    }

                </Tab.Navigator>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.white
    },
    header: {
        height: '20%', flexDirection: 'row'
    },
    headerLogo: {
        height: 120, width: 120,
    },
    backBtn: {
        justifyContent: 'flex-start', alignSelf: 'center', marginLeft: 15
    },
    backBtnImg: {
        height: 20,
        width: 20
    },
    imageContainer: {
        flex: 1, alignSelf: 'center', alignItems: 'center', marginRight: 30
    }
})
const mapStateToProps = (state) => ({
    selectedMessage: state.startup.selectedMessage,
});
const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithPhoneOREmail)