import React, { Component } from 'react'
import NavigationAppContainer from 'App/Navigators/AppNavigator'
import { View } from 'react-native';
import { connect } from 'react-redux'
import StartupActions from 'App/Stores/Startup/Actions'
import { PropTypes } from 'prop-types'
import { Helpers } from 'App/Theme'

class RootScreen extends Component {
  componentDidMount() {
    // Run the startup saga when the application is starting.
    this.props.startup()
  }

  render() {
    return (
      <View style={Helpers.fill}>
        {/*
          * Conatins all the navigation flow. 
         */}
        <NavigationAppContainer
        // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
        />

      </View>
    )
  }
}

RootScreen.propTypes = {
  startup: PropTypes.func,
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScreen)
