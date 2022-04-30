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

### /backend/node/server/index.js SQL functions are as follows:
/api -- Checks if we may successfully connect to the node server on EC2 via a get request

<br/>

/receive_classification -- Selects username and prediction from data collected table, searched by an input username via a post request

<br/>

/ins_pred -- Inserts a prediction into the data collected table based on an input username via a post request

<br/>

/rec_user -- Inserts a recommended user given an input username into the data collected table via a post request

<br/>

/rec_rec -- Inserts a recommendation of hostile/friendly into the data collected table based on an input username and the associated recommended user via a post request

<br/>

/get_recs -- Selects all recommended users and their associated recommendations from the data collected table based on an input username and if the recommendation is deemed friendly via a post request

<br/>

/check_match -- Inserts a new row into the friends table and updates the friends list column if two users are mutually pending as friends via a get request

<br/>

/friends -- Inserts a new row into the friends table given an input username and a new pending friend request made by the user via a post request

<br/>

/get_friends -- Returns the friends list given an input username where the friends list must not be empty in the friends table via a post request

<br/>

/delete_pending -- Deletes any users which were mutually pending as friends from the friends table, this function is called after get_friends such that the table is not clogged with friends that are mutually pending via a get request because mutually pending friends are added to each other’s friends lists

<br/>

/get_profile -- Returns every field associated with an input username’s profile to print the whole profile on the profile screen of the front end via a post request

<br/>

/classification -- Inserts every available input field into the data collected table via a post request

<br/>

/check_if_user_exists -- Returns true if the user exists in the users table given an input username via a post request

<br/>

/update_gps -- Updates the GPS column’s coordinates for every instance of an input username to the data collected table via a post request

<br/>

/get_gps -- Returns the GPS to be sent to the front end of the application given an input username, splits the single column by “,” into longitude and latitude via a post request

<br/>

/profile -- Inserts every available input field into the users table via a post request

<br/>

The backend scalendrone.js is necessary to run in order to send GPS coordinates between the sensor on the hardware to the back end, to Scalendrone for the chat rooms, and finally to the front end. Scalendrone.js authenticates to Scalendrone for sending to the chat rooms, and queries the database to match all friends, making them eligible to join the same chat rooms. 	

## Flow Chart

![Woof_2nd_Prototype_User_Interface_Flow_3](https://user-images.githubusercontent.com/50089669/166080639-f22f19b1-e007-4d22-be75-336cd1a34724.PNG)

![Woof_1st_Semester_v3_6](https://user-images.githubusercontent.com/50089669/166080622-5829b7f5-d870-433d-aae6-c53c6ef6e08f.PNG)

<img width="468" alt="Screen Shot 2022-04-29 at 7 31 38 PM" src="https://user-images.githubusercontent.com/50089669/166080659-5bd6e414-c054-4672-ba8e-d0708eeb5c3d.png">

## Dev/Build Tools
Visual Studio Code - Version: 1.66

Xcode - Version: 13.2.1

React Native CLI (Client Line Interface)
React Native Packages (all included in the node modules)

```bash
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
```

Metro - Development Platform - Version: 0.70.2

[packages]
keras = "==2.6.0"
matplotlib = "*"
numpy = "*"
librosa = "*"
pandas = "*"
boto3 = "*"
tensorflow = "*"
pipenv = "*"
Flask = "*"

[dev-packages]

[requires]
python_version = "3.9"

## How to install project from scratch:
### ML model API setup (Also used for receiving GPS)
The API is used for receiving GPS information, and providing predictions to incoming audio files. The model has already been trainined using the ML_Model/train_model.py file. Bootstrapping the API allows for the use of the following urls: /url, /gps and /predict which is preceded by the link running the ML FLASK API. Any incoming audio is redirected to this API using the ML_Model/model_flask/intermediate.js file. This file saves incoming auio to the server and invokes /predict to run the model on this saved file. The /user link is used to retreive the recommended user information, as it is invoked at the same time as the prediction API. Lastly, the /gps endpoint is invoked directly from our hardware to receive GPS information. All three of these APIs forwards its information directly to our node server described in the following section. 

To run the APIs:

Change directory to ML_Model/model_flask
- run following commands 

```bash 
pip install pipenv
pipenv --three
pipenv install flask 
./bootstrap.sh
```

In a different terminal run:
```bash
node intermediate.js
```

### EC2 Server setup
To recreate our EC2 server, first create an elastic IP address in the AWS console. Then, create one VPC to be shared between a private security group and a public security group. Next, create a public and private subnet, each will correspond to a public or private security group. The next step is to create a public and a private security group associated with its corresponding public or private subnet. Then, create an EC2 server with the storage size set to a minimum size mini, have it associated with the VPC created earlier and elastic IP, and associate it to a public security group with its associated public subnet. Finally, create an AWS RDS MySQL instance, and associate it with the private security group with its associated private subnet. The EC2 server needs to have custom inbound and outbound rules to support whitelisting requests made from the IP of the hardware. The hardware’s IP address needs to have the ports 3306 for MySQL, 22 for SSH, and 80 for HTTPS/HTTP. These ports need both 0.0.0.0/0 for IPv4, and ::/0 for IPv6. The final step is to clone this repository on EC2, after which, change the working directory to inside software/backend, then change directory to node/server, and run node ./index.js for npm start to start the server such that requests from the front-end can populate the backend with user data. Storing this data is essential to our product because it allows for the transfer of login information between the various pages/screens, and for saving the information for future login sessions. 

Note: These instructions are for development on macOS deploying the application to an iPhone. For instructions on how to develop on other environments, please refer to https://reactnative.dev/docs/environment-setup

### Dependencies
Install Node & Watchman using Homebrew
```bash
brew install node
brew install watchman
```
Install Xcode
Easy to do through the Mac App Store
Install Command Line Tools in Xcode
Preferences → Locations → select most recent version in CLI dropdown
Install Cocoapods
```bash
sudo gem install cocoapods
```
Install NVM to install node on EC2
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
```
Install node
```bash
nvm install node
node -e "console.log('Running Node.js ' + process.version)"
```
Install MySQL command line for the server script
```bash
sudo apt install mysql-server
```

### Run Project on Emulator
Download the UI Folder from GitHub
Store file in proper location
Download dependencies
```bash
npm install (in the project directory)
```
Open two separate terminals, both in the project’s directory
Terminal 1: Start Metro Bundler
```bash
npx react-native start
```
Terminal 2: Run the Project
```bash
npx react-native run-ios 
```

### Run Project on Device
Plug in your device through USB-cable
Go to the ‘ios’ folder in the project directory
Open the ‘.xcodeproj’ file. This should open up Xcode
Register for an Apple Developer Account
Go to the ‘General’ panel, and configure the team settings
Choose your device under ‘Targets’
Run your project by clicking ‘Build and Run’



