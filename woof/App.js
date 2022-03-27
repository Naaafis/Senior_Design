/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Button,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';

import firebase from 'react-native-firebase';

const App = () => {

  const [loggedIn, setloggedIn] = useState(false);
  const [user, setUser] = useState([]);

  
const googlesigninconfig = {
  webClientId: '498217439136-lpbe106iiec17v4utv5v7i6jnf8bfkcf.apps.googleusercontent.com', // client ID of type WEB for your server(needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: '498217439136-rkoa3qu157srfudl86pikkggs2vj26j3.apps.googleusercontent.com',
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
}
GoogleSignin.configure({googlesigninconfig});
  
  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
    if (user) setloggedIn(true);
  }

  const subscriber = auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount

   _signIn = () => {
    try {
      GoogleSignin.hasPlayServices();
      GoogleSignin.signIn()
      .then((data) => {
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        return firebase.auth().signInWithCredential(credential);
      })
      .then((currentUser) => {
        console.log('google login with user: ${JSON.stringify(currentUser.toJSON())}');
      })
      .catch((error) => {
        console.log('Login fail with error: ${error}');
      });
      //console.warn({userInfo: info});
      //setUserInfo(info);
      setloggedIn(true);
      
    } catch (error) { 
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };  

      _signOut = () => {
        try {
          GoogleSignin.revokeAccess();
          GoogleSignin.signOut();
          auth()
        .signOut()
        .then(() => alert('You are signed out!'));
          //setUserInfo(null); // Remember to remove the user from your app's state as well
          setloggedIn(false);
        } catch (error) {
          if (error) console.error(error.message);
        }
      };

  return (
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Header />

        <View style={styles.body}>
            <View style={styles.buttonContainer}>
              {!setloggedIn && (
                <GoogleSigninButton
                  style={{width: 192, height: 48}}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={this._signIn}
                  disabled={false}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              {setloggedIn && (
                <View>
                  <Text>Welcome {user.displayName}</Text>
                  <Button
                    onPress={this._signOut}
                    title="LogOut"
                    color="red"></Button>
                </View>
              )}
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  buttonContainer: {
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
