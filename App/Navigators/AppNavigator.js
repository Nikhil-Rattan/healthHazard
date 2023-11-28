import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import NavigationService from 'App/Services/NavigationService';
import React from 'react';
import { Helpers } from 'App/Theme';
import loginScreen from 'App/Container/Authentication/loginScreen';
import SignUp from 'App/Container/Authentication/SignUp';
import AccountTypeScreen from 'App/Container/Authentication/AccountTypeScreen';

import launchingScreen from 'App/Container/Authentication/launchingScreen';

import SuccessSignupScreen from 'App/Container/Authentication/PatientAuthentication/SuccessSignupScreen';

import Splashscreen from 'App/Container/splashScreen/Splashscreen';
import QrCodeScannerScreen from 'App/Container/PatientModule/Qrcode/QrCodeScannerScreen';
import PatientQRCodeScannerScreen from 'App/Container/PatientModule/Qrcode/PatientQRCodeScannerScreen';
import PatientQRCodeAndResultScannerScreen from 'App/Container/PatientModule/Qrcode/PatientQRCodeAndResultScannerScreen';
import KitQRCodeScanner from 'App/Container/PatientModule/Qrcode/KitQRCodeScanner';

import SearchPhysician from 'App/Container/PatientModule/SearchPhysicians/SearchPhysician';

import TelehealthExpertsScreens from 'App/Container/PatientModule/SearchPhysicians/TelehealthExpertsScreens';
import TelehealthExpertDetails from 'App/Container/PatientModule/SearchPhysicians/TelehealthExpertDetails';

import TestingSitesListsScreen from 'App/Container/PatientModule/Pharmacy/TestingSitesListsScreen';
import PharmacyDetail from 'App/Container/PatientModule/Pharmacy/PharmacyDetail';
import OurProducts from 'App/Container/PatientModule/Products/OurProducts';
import ConformShipping from 'App/Container/PatientModule/Products/ConformShipping';

import PaymentRecieved from 'App/Container/PatientModule/Products/PaymentRecieved';
import FAQNewScreen from 'App/Container/FacilityModule/FAQNewScreen';

import VideoInstructionScreen from 'App/Container/FacilityModule/InstructionsFlow/VideoInstructionScreen';
import VideoInstructionNewScreen from 'App/Container/FacilityModule/InstructionsFlow/VideoInstructionNewScreen';
import InstructionFirstScreen from 'App/Container/FacilityModule/InstructionsFlow/InstructionFirstScreen';
import InstructionSecondScreen from 'App/Container/FacilityModule/InstructionsFlow/InstructionSecondScreen';
import InstructionThirdScreen from 'App/Container/FacilityModule/InstructionsFlow/InstructionThirdScreen';
import InstructionForthScreen from 'App/Container/FacilityModule/InstructionsFlow/InstructionForthScreen';
import InstructionFifthScreen from 'App/Container/FacilityModule/InstructionsFlow/InstructionFifthScreen';
import LastStepScreen from 'App/Container/FacilityModule/InstructionsFlow/LastStepScreen';
import PatientMenu from 'App/Container/PatientModule/Menu/PatientMenu';
import ViewProfileScreen from 'App/Container/PatientModule/Profile/ViewProfileScreen';
import SuccessScreenNew from 'App/Container/FacilityModule/InstructionsFlow/SuccessScreenNew';
import InvalidNew from 'App/Container/FacilityModule/InstructionsFlow/InvalidNew';

import CodeVerificationScreen from 'App/Container/Authentication/CodeVerificationScreen';
import UserLicense from 'App/Container/Agree&Policies/UserLicense';
import PrivacyPolicy from 'App/Container/Agree&Policies/PrivacyPolicy';
import BuildProfileScreen from 'App/Container/Authentication/PatientAuthentication/BuildProfileScreen';
import AdditionalDetailScreen from 'App/Container/Authentication/PatientAuthentication/AdditionalDetailScreen';
import PatientBottomTabMenu from 'App/Components/PatientBottomTabMenu';

import Pharmacylist from 'App/Container/PatientModule/Pharmacy/Pharmacylist';
import PatientDashboard from 'App/Container/PatientModule/Pharmacy/PatientDashboard';

import TestReportScreen from 'App/Container/PatientModule/Pharmacy/TestReportScreen';

import PharmacyDetailsScreen from 'App/Container/PatientModule/Pharmacy/PharmacyDetailsScreen';

import ProfileScreen from 'App/Container/PatientModule/Profile/ProfileScreen';
import ChangePasswordScreen from 'App/Container/PatientModule/Profile/ChangePassword';

import EditProfileScreen from 'App/Container/PatientModule/Profile/EditProfileScreen';
import ForgotPasswordScreen from 'App/Container/Authentication/ForgotPasswordScreen';

import PatientSurvey from 'App/Container/PatientModule/PatientSurvey/PatientSurvey';
import SurveySuccessScreen from 'App/Container/PatientModule/PatientSurvey/SurveySuccessScreen';

import FacilityProfile from 'App/Container/Authentication/FacilityAuthentication/FacilityProfile';
import FacilityContanctPersonProfile from 'App/Container/Authentication/FacilityAuthentication/FacilityContanctPersonProfile';
import FacilityPhysicianProfile from 'App/Container/Authentication/FacilityAuthentication/FacilityPhysicianProfile';
import FacilitySignupSuccessScreen from 'App/Container/Authentication/FacilityAuthentication/FacilitySignupSuccessScreen';

import FacilityPatientScan from 'App/Container/FacilityModule/FacilityPatient/FacilityPatientScan';
import FacilityEnterTestResult from 'App/Container/FacilityModule/FacilityPatient/FacilityEnterTestResult';

import FacilityPatientProfileScreen from 'App/Container/FacilityModule/FacilityPatient/FacilityPatientProfileScreen';
import FacilityPatientAdditionalDetailScreen from 'App/Container/FacilityModule/FacilityPatient/FacilityPatientAdditionalDetailScreen';
import KitSacanIntiateScreen from 'App/Container/FacilityModule/PatientKitScan/KitSacanIntiateScreen';
import PatientKitScannerScreen from 'App/Container/FacilityModule/PatientKitScan/PatientKitScannerScreen';
import EnterTestResultWithQR from 'App/Container/FacilityModule/PatientKitScan/EnterTestResultWithQR';
import KitSacanIntiateScreenWithQRCode from 'App/Container/FacilityModule/PatientKitScan/KitSacanIntiateScreenWithQRCode';

import ScanPatientQRScreen from 'App/Container/FacilityModule/KitAssociationsAndResult/ScanPatientQRScreen';
import KitScanMessageScreen from 'App/Container/FacilityModule/KitAssociationsAndResult/KitScanMessageScreen';
import EnterTestResult from 'App/Container/FacilityModule/KitAssociationsAndResult/EnterTestResult';

import CertifiedTestersScreen from 'App/Container/FacilityModule/FacilityTesterScreens/CertifiedTestersScreen';

import CreateNewTesterScreen from 'App/Container/FacilityModule/FacilityTesterScreens/CreateNewTesterScreen';

import EditTesterScreen from 'App/Container/FacilityModule/FacilityTesterScreens/EditTesterScreen';
import TesterMenu from 'App/Container/FacilityModule/FacilityTesterScreens/TesterMenu';
import ManageEditTesterDetails from 'App/Container/FacilityModule/FacilityTesterScreens/ManageEditTesterDetails';

import FacilitiesPatientList from 'App/Container/FacilityModule/FacilityDashboard/FacilitiesPatientList';

import FacilityeditProfilescreen from 'App/Container/FacilityModule/FacilityProfileEdit/FacilityeditProfilescreen';

import FacilityDetailsResultsListScreen from 'App/Container/FacilityModule/FacilityDashboard/FacilityDetailsResultsListScreen';

import PatientCodeScanAndResultImageScreen from 'App/Container/PatientModule/Qrcode/PatientCodeScanAndResultImageScreen';
import MyTestResultsScreen from 'App/Container/PatientModule/Pharmacy/MyTestResultsScreen';
import MyQRCodeScreen from 'App/Container/PatientModule/Qrcode/MyQRCodeScreen';

import EditShipping from 'App/Container/PatientModule/Products/EditShipping';
import Shipping from 'App/Container/PatientModule/Products/Shipping';
import FaciltyViewProfileScreen from 'App/Container/FacilityModule/Menu/FaciltyViewProfileScreen';
import FacilityMenu from 'App/Container/FacilityModule/Menu/FacilityMenu';
import FacilityDashboard from 'App/Container/FacilityModule/FacilityDashboard/FacilityDashboard';
import FacilityBottomTab from 'App/Components/FacilityBottomTab';

import ManageFacilityProfile from 'App/Container/FacilityModule/FacilityProfileEdit/ManageFacilityProfile';
import EditPatientInfo from 'App/Container/PatientModule/Profile/EditPatientInfo';
import FindPatientScreen from 'App/Container/FacilityModule/FacilityDashboard/FindPatientScreen';

import OrderHistoryScreen from 'App/Container/PatientModule/Products/OrderHistoryScreen';
import OrderTrackingScreen from 'App/Container/PatientModule/Products/OrderTrackingScreen';
import PatientEnterResultScreen from '../Container/PatientModule/Qrcode/PatientEnterResultScreen';
import PhoneLoginScreen from 'App/Container/Authentication/PhoneLoginScreen';
import PhoneSignupScreen from 'App/Container/Authentication/PhoneSignupScreen';
import LoginWithPhoneOREmail from 'App/Container/Authentication/LoginWithPhoneOREmail'
import PhoneOTPScreen from '../Container/Authentication/PhoneOTPScreen';

const Stack = createStackNavigator();
const PatientStack = createStackNavigator();
const PatientTab = createBottomTabNavigator();
const FacilityTab = createBottomTabNavigator();

function PatientDashboardStack() {
  return (
    <PatientStack.Navigator initialRouteName="MainDashboard">
      <Stack.Screen
        name="MainDashboard"
        component={PatientDashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PharmacyDetailsScreen"
        component={PharmacyDetailsScreen}
        options={{ headerShown: false }}
      />
    </PatientStack.Navigator>
  );
}

function PatientTabStack() {
  return (
    <PatientTab.Navigator
      tabBar={(props) => (
        <PatientBottomTabMenu
          tabBarProp={props}
          tabContainer={[Helpers.bottomTabStyle, {}]}
        />
      )}>
      <PatientTab.Screen name="Home" component={PatientDashboardStack} />
      <PatientTab.Screen name="QR Code" component={MyQRCodeScreen} />
      <PatientTab.Screen name="FAQ" component={FAQNewScreen} />
      <PatientTab.Screen name="Results" component={MyTestResultsScreen} />
      <PatientTab.Screen name="Menu" component={PatientMenu} />
    </PatientTab.Navigator>
  );
}

function FacilityTabStack() {
  return (
    <FacilityTab.Navigator
      tabBar={(props) => (
        <FacilityBottomTab
          tabBarProp={props}
          tabContainer={[Helpers.tabContainer, {}]}
        />
      )}>
      <FacilityTab.Screen name="Home" component={FacilityDashboard} />
      <FacilityTab.Screen name="FAQ" component={FAQNewScreen} />
      <FacilityTab.Screen name="Menu" component={FacilityMenu} />
    </FacilityTab.Navigator>
  );
}

export default function NavigationAppContainer() {
  return (
    <NavigationContainer
      ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
      <Stack.Navigator initialRouteName="Splashscreen">
        <Stack.Screen
          name="loginScreen"
          component={loginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PhoneLoginScreen"
          component={PhoneLoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PhoneSignupScreen"
          component={PhoneSignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginWithPhoneOREmail"
          component={LoginWithPhoneOREmail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PhoneOTPScreen"
          component={PhoneOTPScreen}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PatientQRCodeScannerScreen"
          component={PatientQRCodeScannerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PatientCodeScanAndResultImageScreen"
          component={PatientCodeScanAndResultImageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FacilityHome"
          component={FacilityTabStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PatientHome"
          component={PatientTabStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Splashscreen"
          component={Splashscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LaunchingScreen"
          component={launchingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccountTypeScreen"
          component={AccountTypeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CodeVerificationScreen"
          component={CodeVerificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserLicense"
          component={UserLicense}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SuccessSignupScreen"
          component={SuccessSignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QRCodeScanner"
          component={QrCodeScannerScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TestReportScreen"
          component={TestReportScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BuildProfileScreen"
          component={BuildProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdditionalDetailScreen"
          component={AdditionalDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateNewTesterScreen"
          component={CreateNewTesterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditTesterScreen"
          component={EditTesterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FacilityProfile"
          component={FacilityProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FacilityContanctPersonProfile"
          component={FacilityContanctPersonProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FacilityPhysicianProfile"
          component={FacilityPhysicianProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FacilitySignupSuccessScreen"
          component={FacilitySignupSuccessScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FacilityPatientProfileScreen"
          component={FacilityPatientProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FacilityPatientAdditionalDetailScreen"
          component={FacilityPatientAdditionalDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="KitSacanIntiateScreen"
          component={KitSacanIntiateScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PatientKitScannerScreen"
          component={PatientKitScannerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ScanPatientQRScreen"
          component={ScanPatientQRScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="KitScanMessageScreen"
          component={KitScanMessageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EnterTestResult"
          component={EnterTestResult}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FacilitiesPatientList"
          component={FacilitiesPatientList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FacilityeditProfilescreen"
          component={FacilityeditProfilescreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FacilityDetailsResultsListScreen"
          component={FacilityDetailsResultsListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EnterTestResultWithQR"
          component={EnterTestResultWithQR}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PatientEnterResultScreen"
          component={PatientEnterResultScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="KitSacanIntiateScreenWithQRCode"
          component={KitSacanIntiateScreenWithQRCode}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FacilityPatientScan"
          component={FacilityPatientScan}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FacilityEnterTestResult"
          component={FacilityEnterTestResult}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PatientSurvey"
          component={PatientSurvey}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SurveySuccessScreen"
          component={SurveySuccessScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchPhysician"
          component={SearchPhysician}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelehealthExpertsScreens"
          component={TelehealthExpertsScreens}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelehealthExpertDetails"
          component={TelehealthExpertDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TestingSitesListsScreen"
          component={TestingSitesListsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PharmacyDetail"
          component={PharmacyDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OurProducts"
          component={OurProducts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentRecieved"
          component={PaymentRecieved}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConformShipping"
          component={ConformShipping}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FAQNewScreen"
          component={FAQNewScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InstructionFirstScreen"
          component={InstructionFirstScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InstructionSecondScreen"
          component={InstructionSecondScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InstructionThirdScreen"
          component={InstructionThirdScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InstructionForthScreen"
          component={InstructionForthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InstructionFifthScreen"
          component={InstructionFifthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LastStepScreen"
          component={LastStepScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PatientMenu"
          component={PatientMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewProfileScreen"
          component={ViewProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PatientQRCodeAndResultScannerScreen"
          component={PatientQRCodeAndResultScannerScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="KitQRCodeScanner"
          component={KitQRCodeScanner}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SuccessScreenNew"
          component={SuccessScreenNew}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InvalidNew"
          component={InvalidNew}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pharmacylist"
          component={Pharmacylist}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditShipping"
          component={EditShipping}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Shipping"
          component={Shipping}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyQRCodeScreen"
          component={MyQRCodeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CertifiedTestersScreen"
          component={CertifiedTestersScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FaciltyViewProfileScreen"
          component={FaciltyViewProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageFacilityProfile"
          component={ManageFacilityProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditPatientInfo"
          component={EditPatientInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TesterMenu"
          component={TesterMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageEditTesterDetails"
          component={ManageEditTesterDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VideoInstructionScreen"
          component={VideoInstructionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VideoInstructionNewScreen"
          component={VideoInstructionNewScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FindPatientScreen"
          component={FindPatientScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderHistoryScreen"
          component={OrderHistoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderTrackingScreen"
          component={OrderTrackingScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
