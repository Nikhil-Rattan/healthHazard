import React, { Component } from "react";
import { Platform } from "react-native";
import PushNotification from "react-native-push-notification";
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import AuthenticateActions from 'App/Stores/Authentication/Actions'

class PushController extends Component {
  constructor(props) {
    super(props);
    this._SetFcmToken = this._SetFcmToken.bind(this)

    let self = this
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        self._SetFcmToken(token)
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        if (!notification.userInteraction) {

          PushNotification.localNotificationSchedule({

            message: notification.message, // (required)
            date: new Date(Date.now()), // in 60 secs
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
          });

        }
        if (Platform.OS === 'android') {
          notification.userInteraction = true
        }
        self._GetNotificationCount()
        PushNotification.setApplicationIconBadgeNumber(0);
      },

      // (optional) Called when Registered Action is pressed and invoke App is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        //  error message
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });


  }

  componentDidMount() {

    let { fcmToken } = this.props;
    let self = this
  }
  // set FCM token
  _SetFcmToken({ token }) {
    if (Platform.OS === 'android') {
      this.props.setFcmToken(token)
    }
    else {
      this.props.getFcmTokenForIos({ token })
    }
  }

  // Get the notification count 
  _GetNotificationCount() {
    let { UserId } = this.props.authenticatedUser
    this.props.getNotificationCount({ UserId: UserId })
  }

  render() {
    return null;
  }
}
PushController.propTypes = {
  fcmToken: PropTypes.string,
  setFcmToken: PropTypes.func,
  getFcmTokenForIos: PropTypes.func,
  getNotificationCount: PropTypes.func,
  authenticatedUser: PropTypes.any,
}

const mapStateToProps = (state) => ({
  fcmToken: state.authenticate.fcmToken,
  authenticatedUser: state.authenticate.authenticatedUser,

})

const mapDispatchToProps = (dispatch) => ({
  setFcmToken: (data) => dispatch(AuthenticateActions.setFcmToken(data)),
  getNotificationCount: (data) => dispatch(AuthenticateActions.getNotificationCount(data)),
  getFcmTokenForIos: (data) => dispatch(AuthenticateActions.getFcmTokenForIos(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PushController)
