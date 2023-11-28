import * as React from 'react';
import { SafeAreaView } from 'react-native';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import createStore from 'App/Stores'
import RootScreen from './Container/Root/RootScreen'

import NetworkInternetProvider from 'App/Providers/NetworkInternetProvider';
import PushController from 'App/Providers/PushController';
import { Helpers } from 'App/Theme'

const { store, persistor } = createStore()

export default class App extends React.Component {


  render() {
    return (
      /**
      * @see https://github.com/reduxjs/react-redux/blob/master/docs/api/Provider.md
      */
      <SafeAreaView style={Helpers.fill}>

        <Provider store={store}>
          {/**
            * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved and saved to redux.
         
            * The "loading" prop can be "null" or any react instance to show during loading (e.g. a splash screen)

            * Example loading={<SplashScreen />}.
                @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
          **/}

          <PersistGate loading={null} persistor={persistor}>

            {/**
              * Check the Internet Connectivity and Internet Connection Type.
            **/}
            <NetworkInternetProvider>
            </NetworkInternetProvider>

            {/** 
              * Controls all the Notification Flow of app.
            **/}
            <PushController />

            {/**
                * Contains and manages all the data require at the startup of the app.
            **/}
            <RootScreen />

          </PersistGate>

        </Provider>

      </SafeAreaView>
    )
  }
}
