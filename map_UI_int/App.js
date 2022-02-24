import * as React from 'react';
import {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/screens/HomeScreen';
import {RegistrationScreen} from './src/screens/RegistrationScreen';
import {LoginScreen} from './src/screens/LoginScreen';
import {MainMenuScreen} from './src/screens/MainMenuScreen';
import {ProfileScreen} from './src/screens/ProfileScreen';
import {FriendsScreen} from './src/screens/FriendsScreen';
import {AddFriendsScreen} from './src/screens/AddFriendsScreen';
import {DogStatusScreen} from './src/screens/DogStatusScreen';
import {MapScreen} from './src/screens/MapScreen';
import {ChatScreen} from './src/screens/ChatScreen';

const Stack = createNativeStackNavigator();

class App extends Component{
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main Menu" component={MainMenuScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Friends" component={FriendsScreen} />
          <Stack.Screen name="Add Friends" component={AddFriendsScreen} />
          <Stack.Screen name="Dog Status" component={DogStatusScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;