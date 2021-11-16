import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';


//enter your Firebase info here and uncomment

///////////////////////////////////////////////
//                                           //
//        const firebaseConfig = {           //
//            apiKey:                        //
//            authDomain:                    //
//            databaseURL:                   //
//            projectId:                     //
//            storageBucket:                 //
//            messagingSenderId:             //
//            appId:                         //
//            measurementId:                 //
//        };                                 //
//                                           //
///////////////////////////////////////////////

const firebaseConfig = {
  apiKey: "AIzaSyAvwSa1nFZ-ZIsKSIiMhhGZ8ha3eGR6mJs",
  authDomain: "woof-91636.firebaseapp.com",
  projectId: "woof-91636",
  storageBucket: "woof-91636.appspot.com",
  messagingSenderId: "1098077248824",
  appId: "1:1098077248824:web:a728b218e051cdfff0f5cd",
  measurementId: "G-PY0WFXH6X4"
};


// from CalorieApp
// import the different screens
import Loading from "./components/Loading";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Main from "./components/Main";

//didnt want to delete anything and crash code, Ill get rid of the extra calorie app screens later

//new for WOOF
import UserProfile_Woof from "./components/UserProfile_Woof";



import Mapbox from "./components/Mapbox_Woof";
import FriendsPage_Woof from "./components/FriendsPage_Woof";
import HistoryPage_Woof from "./components/HistoryPage_Woof";


// create our app's navigation stack
const RootStack = createSwitchNavigator(
    {
        Loading: Loading,
        SignUp: SignUp,
        Login: Login,
        Main: Main,

        UserProfile_Woof: UserProfile_Woof,
        Mapbox: Mapbox,
        FriendsPage_Woof: FriendsPage_Woof,
        HistoryPage_Woof: HistoryPage_Woof
    },
    {
        initialRouteName: "Loading"
    }
);

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//const analytics = firebase.getAnalytics(app);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const App = createAppContainer(RootStack);
export default App;