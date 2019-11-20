/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, StatusBar} from 'react-native';
import {fetch} from '@react-native-community/netinfo';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';

const App = () => {
  const [netInfo, setNetInfo] = useState(null);
  const [permissions, setPermissions] = useState('');

  useEffect(() => {
    console.log(permissions);
    if (permissions === 'The permission is granted') {
      console.log('fetching netInfo');
      fetch().then(response => {
        console.log('response', response);
        setNetInfo(response);
      });
    }
  }, [permissions]);

  // Location Permissions
  const locationPermissionsCallback = result => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        setPermissions(
          'This feature is not available (on this device / in this context)',
        );
        break;
      case RESULTS.DENIED:
        setPermissions(
          'The permission has not been requested / is denied but requestable',
        );
        if (Platform.OS === 'ios') {
          request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
            locationPermissionsCallback(result); // recursive call to take us through the correct workflow with the result of our request
          });
        }
        if (Platform.OS === 'android') {
          request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then(result => {
            locationPermissionsCallback(result); // recursive call to take us through the correct workflow with the result of our request
          });
        }
        break;
      case RESULTS.GRANTED:
        setPermissions('The permission is granted');
        break;
      case RESULTS.BLOCKED:
        setPermissions('The permission is denied and not requestable anymore');
        break;
    }
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        .then(locationPermissionsCallback)
        .catch(error => {
          console.log('error', error);
        });
    }
    if (Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
        .then(locationPermissionsCallback)
        .catch(error => {
          console.log('error', error);
        });
    }
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <Text>Hello!</Text>
            <Text>NetInfo: {JSON.stringify(netInfo)}</Text>
            <Text>Location Permissions: {permissions || 'Checking...'}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
