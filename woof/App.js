/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  } from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';

export default () => {
  //const isDarkMode = useColorScheme() === 'dark';
  const [loggedIn, setloggedIn] = useState(false);
  const [user, setUser] = useState([]);

  _signIn = async () => {
    try {
      //console.log("Google Sign in pending");
      
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '498217439136-lpbe106iiec17v4utv5v7i6jnf8bfkcf.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER,
      iosClientId: '498217439136-rkoa3qu157srfudl86pikkggs2vj26j3.apps.googleusercontent.com',
      profileImageSize: 120,
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      setloggedIn(true);

      const credential = auth.GoogleAuthProvider.credential(idtoken, accessToken,);
      await auth.signInWithCredential(credential);
      
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
    if (user) setloggedIn(true);
  }
  

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => alert('You are signed out!'));
      setloggedIn(false);
      setuserInfo([]);
    } catch (error) {
      console.error(error);
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
           <View style={styles.sectionContainer}>
             {!loggedIn && (
             <GoogleSigninButton
               style={{width: 192, height: 48}}
               size={GoogleSigninButton.Size.Wide}
               color={GoogleSigninButton.Color.Dark}
               onPress={this._signIn}
              
             />
             )}
             </View>
             <View style={styles.buttonContainer}>
              {!user && <Text>You are currently logged out</Text>}
              {user && (
                <View>
                  <Text>Welcome {user.displayName}</Text>
                  <Button
                    onPress={this.signOut}
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
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  buttonContainer: {
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
});

