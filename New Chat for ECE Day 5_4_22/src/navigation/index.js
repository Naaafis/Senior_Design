import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import {Auth, Hub} from 'aws-amplify';

import {MainMenuScreen} from '../screens/MainMenuScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {FriendsScreen} from '../screens/FriendsScreen';
import {AddFriendsScreen} from '../screens/AddFriendsScreen';
import {MapScreen} from '../screens/MapScreen';
import {ChatScreen} from '../screens/ChatScreen';
import PendingScreen from '../screens/PendingFriends';

const Stack = createNativeStackNavigator();
const test = "helloWorld";

const Navigation = () => {
  
  const [user, setUser] = useState(undefined);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    let isMounted = false;
    const listener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        if (!isMounted){
          checkUser();
        }
        
      }
    };

    Hub.listen('auth', listener);
    return () => (isMounted = true, Hub.remove('auth', listener));
  }, []);

  if (user === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  // <NavigationContainer> 
  //   <Stack.Navigator initialRouteName="Login"> 
  //     <Stack.Screen name="Home"> 
  //     {props => <HomeScreen {...props} extraData={user} />} 
  //       </Stack.Screen> 
  //       <Stack.Screen name="Login" component={LoginScreen} /> 
  //     <Stack.Screen name="Registration" component={RegistrationScreen} />
  //   </Stack.Navigator> 
  // </NavigationContainer>

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} initialParams={{'key':'NAMEIS'}}/>
            <Stack.Screen name="Main Menu" component={MainMenuScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Friends" component={FriendsScreen} />
            <Stack.Screen name="Add Friends" component={AddFriendsScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Pending Friends" component={PendingScreen} />
          </>
      ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} initialParams={{'val':'sign in'}} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
          </>
      )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;