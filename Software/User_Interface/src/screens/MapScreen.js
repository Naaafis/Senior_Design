import React , {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
//more imports to handle the maps aspect
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'; //old geolocation feature is outdated so import from rn-community

//Constants
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const Scaledrone = require('scaledrone-react-native');
let flagflag = false;
let locations = [];
let friends = [];
let controller;
let controller2;
let controller3;

class MapScreen extends Component {
  //include all members currently included in this map
  constructor() {
    super();
    this.state = {
      members: [],
      isMounted: false,
    };
  }
  //I want to send this user's name to a seperate javascript file through a post request
  //where the body I send out will incldue the username
  sendUserInfo(e){
    const requestOptions = {
      method: 'POST',
      headers: {Accept: 'application/json'  , 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {username: this.props.route.params.userName}
      ),
    };
    fetch('http://18.189.19.59:3000/userinfo', requestOptions) //elastic ip.. cool.
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data))
        console.log(data)
        //this.predictionChange(data["message"])
      })
      .catch(error=> console.log(error))
  }

  async getLocations(name) {
    let status;
    controller2 = new AbortController();
    return fetch('http://18.219.228.229:3000/get_gps', {
    // return fetch('https://35d4027e-f230-4e9c-9576-a2f41c8d937c.mock.pstmn.io/get_gps', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: this.props.route.params.userName, recommendeduser: name})
    }).then(response => response.json())
    .then(res => {
      status = res.status;
      console.log(res);
      console.log({name: res.name, longitude: res.longitude, latitude: res.latitude});
      locations.push(res); //add to the locations array
      // this.setState(prevState => ({
      //   locations: [...prevState.locations, res]
      // }));
      console.log(locations);
    })
    .then(res => {
      this.sendLocationToScaledrone(locations);
    })
    .catch(error => console.error(error));
  }

  async getFriends(e){
    controller = new AbortController();
    const requestOptions = {
        method: 'POST',
        headers: {Accept: 'application/json'  , 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {username: this.props.route.params.userName} //check this
        ),
      };
      return fetch('http://18.219.228.229:3000/get_friends', requestOptions)
        .then(response => response.json())
        .then(resJson => {
          console.log(JSON.stringify(resJson))
          console.log(resJson)
          friends.push(resJson)
          //this.predictionChange(data["message"])
        })
        .then(res =>{
          console.log('these are the friends' + JSON.stringify(friends));
          // friends[0].forEach(friend => {
          //   console.log('inside' + JSON.stringify(friend));
          //   console.log('friend.title: ' + friend.title);
          //   this.getLocations(friend.title);
          // })
          for (const friend of friends[0]){
            this.getLocations(friend.title);
          }
          this.getLocations(this.props.route.params.dogName);
          
          // friends[0].forEach(function(item,i){
          //   this.getLocations(function(item){
          //     console.log(i);
          //   });
          // });
          // console.log('helloooooo'+friends[0][0].title);
          // this.getLocations(friends[0][0].title);
        })
        // .then(res => {
        //   this.sendLocationToScaledrone(locations);
        // })
        .catch(error=> console.log(error))
  }

  async doAuthRequest(clientId, name) {
    return fetch('http://18.189.19.59:3000/auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({clientId, name})
    }).then(res => {
      status = res.status;
      return res.text();
    }).then(text => {
      if (status === 200) {
        return text;
      } else {
        console.error(text);
      }
    }).catch(error => console.error(error));
  }

  sendLocationToScaledrone(location){
    locations.forEach(location => {
        // const drone = new Scaledrone('izEwJATwy5REKqUw');
        const drone = new Scaledrone('5gBzpBF3p2Yxqowg');
        drone.on('error', error => console.error(error));
        drone.on('open', error => {
          if (error) {
            return console.error(error);
          }
          doAuthRequest(drone.clientId, location.name)
            .then(jwt => drone.authenticate(jwt));
        });
        drone.on('authenticate', error => {
          if (error) {
            return console.error(error);
          }
          setInterval(() => {
            // const delta = this.moveInRandomDirection();
  
            // location.latitude += delta.dlat;
            // location.longitude += delta.dlon;
            drone.publish({
              room: 'observable-locations',
              message: location
            });
          }, 1000);
        });
        // subscribe so our data is avaiable to the observable room
        drone.subscribe('observable-locations');
      });
  }
  
  // moveInRandomDirection(maxDistance = 0.005) {
  //   const angle = Math.random() * Math.PI * 2;
  //   const distance = maxDistance * Math.random();
  //   return {
  //     dlat: Math.cos(angle) * distance,
  //     dlon: Math.sin(angle) * distance,
  //   };
  // }


  //this function will update the scaledrone room everytime there is an update to someone's location
  componentDidMount() {

    const drone = new Scaledrone('5gBzpBF3p2Yxqowg'); // creates a scaledrone instance
    drone.on('error', error => {
      console.error('Error with connection:', error);
    });
    drone.on('close', event => {
      console.log('Connection closed:', event);
    });
    drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      //this is an iOS capability only, different for EXPO
      // Alert.prompt( //prompt user for their name, as well as authenticate the js web token
      //   'What is your name?', null, name => doAuthRequest(drone.clientId, name).then(
      //     jwt => drone.authenticate(jwt) //request to the authentication server
      //   )
      // );

      //try to pass the username as a prop instead and from there just authRequest alone // checkkkkk
      doAuthRequest(drone.clientId, this.props.route.params.userName).then(jwt=> drone.authenticate(jwt));


    });
    //creates a room, which allows us to keep track of current members and furthermore linking messages to to members
    const room = drone.subscribe('observable-locations', {
      historyCount: 20 // load 20 past messages
    });
    room.on('open', error => { //this event connects each user to this room for us to keep track of. once this is done we can start tracking the user's locations
      if (error) {
        return console.error(error);
      }
      //now we are connected to the room
      this.startLocationTracking(position => {
        const {latitude, longitude} = position.coords;
        // publishing device's new location to this salesforce instance
        drone.publish({
          room: 'observable-locations',
          message: {latitude, longitude} // just need to replace this in the future with GPS location's coordinates
        });
      });
    });
    // received past message
    room.on('history_message', message =>
      this.updateLocation(message.data, message.clientId)
    );
    // // received new message
    room.on('data', (data, member) =>
      this.updateLocation(data, member.id)
    );
    //Emits an array of members that have joined the room. This event is only triggered once,
    //right after the user has successfully connected to the observable room.
    room.on('members', members =>
      this.setState({members})
    );
    //Member join event is emitted when a new member joins the room.
    room.on('member_join', member => {
      const members = this.state.members.slice(0);
      members.push(member);
      this.setState({members});
    });
    //Member leave event is emitted when a member leaves the room.
    room.on('member_leave', member => {
      const members = this.state.members.slice(0); //remove the first member, the one who is leaving
      const index = members.findIndex(m => m.id === member.id); //find the member's id who left
      if (index !== -1) {
        members.splice(index, 1);
        this.setState({members});
      }
    });


    // this.getLocations('Nafis', this.sendLocationToScaledrone(this.state.locations));
    // if (this.state.isMounted === true){
      this.getFriends();
    //}
    // .then(this.sendLocationToScaledrone());
  } // end of mounting the component

  componentWillUnmount(){
    if (controller || controller2){
      controller.abort();
      controller2.abort();
    }
  }

    startLocationTracking(callback) {
    Geolocation.watchPosition(
      callback,
      error => console.error(error),
      {
        enableHighAccuracy: true,
        timeout: 10000, // a positive value that indicates the maximum time the device is allowed to return a position
        maximumAge: 1000 //positive value indicating the maximum age in milliseconds of a possible cached position that is acceptable to return. In other words, how old can cached locations be before I should start getting the current location to return.﻿
      }
    );
  }

  updateLocation(data, memberId) {
     const {members} = this.state;
     const member = members.find(m => m.id === memberId);
     if (!member) {
       // a history message might be sent from a user who is no longer online
       return;
     }
     if (member.location) {
       member.location.timing({
         latitude: data.latitude,
         longitude: data.longitude,
       }).start();
     } else {
       // can accept an AnimatedRegion value as its region prop.
       // This allows you to utilize the Animated API to control the map's center and zoom
       member.location = new AnimatedRegion({
         latitude: data.latitude,
         longitude: data.longitude,
         latitudeDelta: LATITUDE_DELTA,
         longitudeDelta: LONGITUDE_DELTA,
       });
       this.forceUpdate();
     }
   }

  render() {
    const {userName, email, nameName, dogName} = this.props.route.params;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={ref => {this.map = ref;}}
          initialRegion={{
            latitude: 42.3605,
            longitude: -71.0596,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          {this.createMarkers()}
        </MapView>
        <View pointerEvents="none" style={styles.members}>
          {this.createMembers()}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.fitToMarkersToMap()}
            style={[styles.bubble, styles.button]}
          >
            <Text>Fit Markers Onto Map</Text>
          </TouchableOpacity>
        </View>
        <Button title="Back" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }



  createMarkers() {
    const {members} = this.state;
    const membersWithLocations = members.filter(m => !!m.location);
    return membersWithLocations.map(member => {
      const {id, location, authData} = member;
      const {name, color} = authData;
      return (
        <Marker.Animated
          key={id}
          identifier={id}
          coordinate={location}
          pinColor={color}
          title={name}
        />
      );
    });
  }


  createMembers() {
   const {members} = this.state;
   return members.map(member => {
     const {name, color} = member.authData;
     return (
       <View key={member.id} style={styles.member}>
         <View style={[styles.avatar, {backgroundColor: color}]}></View>
         <Text style={styles.memberName}>{name}</Text>
       </View>
     );
   });
 }

 fitToMarkersToMap() {
    const {members} = this.state;
    this.map.fitToSuppliedMarkers(members.map(m => m.id), true);
  }

} //end of App

function doAuthRequest(clientId, name) {
  console.log('entered');
  let status;
  return fetch('http://18.189.19.59:3000/auth', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({clientId, name}),
  }).then(res => {
    status = res.status;
    return res.text();
    console.log('received');
  }).then(text => {
    if (status === 200) {
      return text;
    } else {
      alert(text);
    }
  }).catch(error => console.error(error));
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 20,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  members: {
   flexDirection: 'column',
   justifyContent: 'flex-start',
   alignItems: 'flex-start',
   width: '100%',
   paddingHorizontal: 10,
 },
 member: {
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'rgba(255,255,255,1)',
   borderRadius: 20,
   height: 30,
   marginTop: 10,
 },
 memberName: {
   marginHorizontal: 10,
 },
 avatar: {
   height: 30,
   width: 30,
   borderRadius: 15,
 }
});

export {MapScreen};

// class MapScreen extends Component {
//   render(){
//     return (
//       <View style={{flex: 1, alignItems: 'center'}}>
//         <Text style={style.title}>Map</Text>
//         <View style={style.map}></View>
//         <Button title="Back" onPress={() => this.props.navigation.goBack()} />
//       </View>
//     );
//   }
// }

// export {MapScreen};

// const style = StyleSheet.create({
//   title: {
//     marginTop: 20,
//     marginBottom: 20,
//     fontSize: 48,
//   },
//   map: {
//     width: 340,
//     height: 420,
//     backgroundColor: 'antiquewhite',
//     marginBottom: 20,
//   },
// });
