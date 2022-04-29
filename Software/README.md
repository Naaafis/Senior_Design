# Software Readme

## Overview of Software Modules
### App.js
Packages the entire application using AWS Amplify in order to use their Authentication features

### /src/navigation/index.js
This is the navigation component for our application. Every single screen is held in the Navigation Container. Depending on whether or not the user has been authenticated with Amplify, either the sign in container or the container for the main social media application will be displayed.

### /src/screens/HomeScreen/index.js
This home screen is an extension of the sign up screen. If the user has already registered, the screen will simply display ‘Welcome’ and they will be able to click a button to proceed to the rest of the application. Otherwise, they will be prompted to enter three more key pieces of information regarding their dog. 

### /src/screens/MainMenuScreen.js
This screen simply displays buttons for the user to be able to navigate to all of the screens that make up our application. It is the Main Menu of our application. 

### /src/screens/FriendsScreen.js
This screen will display all of the friends that the user currently has, which are stored in the database. It displays this in a FlatList Component, with data it fetches from the database using a fetch API call that makes an HTTP Request.

### /src/screens/AddFriendsScreen.js
This screen allows the user to search for other user’s and see their friends, as well as displays recommended friends. Users can add friends by either clicking on their name once they appear as being recommended users, or once they click on their name once they appear as friends of the other user. Once a user adds another user as a friend, this causes a series of fetch requests to either add this friend as a ‘pending friend’ or if this ‘pending friend’ has the current user in their pending friends list, it will make these two users friends. 

### /src/screens/PendingFriends.js
This software module is displayed on the Add Friends Screen, and it mainly has a fetch call to fetch all recommended friends for the user and display it in a FlatList Component.

### /src/screens/ProfileScreen.js
This screen fetches this user’s profile information from the MySQL Database and displays it.
 
### /src/screens/MapScreen.js
This screen displays the Map Component of our application. It displays the user’s location, as well as their dog’s location and any of their friend’s location. It fetches all of the user’s friends from the database and their latest location, and using Scaledrone nicely stores this information so it is able to be displayed as pins on the Map. 

### /src/screens/ChatScreen.js
### /src/screens/Messages.js
### /src/screens/Input.js
### /src/screens/styles.js
The chat screen allows users to message their friends. It utilizes Scaledrone to store these messages and display them nicely to each user. Scaledrone stores the message as well as the user's name and id. This is how the UI is able to retrieve new messages from Scaledrone and understand which user sent these messages. The messages are displayed using the FlatList in Messages.js and the Input is retrieved from the textbox in the Input.js file. 

## Flow Chart

## Dev/Build Tools
Visual Studio Code - Version: 1.66

Xcode - Version: 13.2.1

React Native CLI (Client Line Interface)
React Native Packages (all included in the node modules)
npm install @react-navigation/native react-native-screens
npm install react-native-safe-areacontext
npm install react-navigation @react-native-community/masked-view
npm install react-native-gesturehandler
npm install react-native-reanimated react-native-paper
npm install @react-navigation/native-stack
npm install react-native-vector-icons react-hook-form
npm install -g @aws-amplify/cli
npm install aws-amplify aws-amplify-react-native amazon-cognito-identity-js @react-native-community/netinfo @react-native-async-storage/async-storage @react-native-picker/picker
npm install scaledrone-react-native
npm install react-native-elements
npm install react-native-maps

Metro - Development Platform - Version: 0.70.2

## How to install project from scratch:

Note: These instructions are for development on macOS deploying the application to an iPhone. For instructions on how to develop on other environments, please refer to https://reactnative.dev/docs/environment-setup

### Dependencies
Install Node & Watchman using Homebrew
brew install node
brew install watchman
Install Xcode
Easy to do through the Mac App Store
Install Command Line Tools in Xcode
Preferences → Locations → select most recent version in CLI dropdown
Install Cocoapods
sudo gem install cocoapods

### Run Project on Emulator
Download the UI Folder from GitHub
Store file in proper location
Download dependencies
npm install (in the project directory)
Open two separate terminals, both in the project’s directory
Terminal 1: Start Metro Bundler
npx react-native start
Terminal 2: Run the Project
npx react-native run-ios 

### Run Project on Device
Plug in your device through USB-cable
Go to the ‘ios’ folder in the project directory
Open the ‘.xcodeproj’ file. This should open up Xcode
Register for an Apple Developer Account
Go to the ‘General’ panel, and configure the team settings
Choose your device under ‘Targets’
Run your project by clicking ‘Build and Run’



