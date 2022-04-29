const Scaledrone = require('scaledrone-node');
const fetch = require('node-fetch');
// const SCALEDRONE_CHANNEL_ID =  {izEwJATwy5REKqUw};

const locations = [
  // {name: 'Nafis', longitude: -122.14114, latitude: 37.370134},
  {name: 'Rajiv', longitude: -122.532, latitude: 37.541414},
  {name: 'Justin', longitude: -122.235, latitude: 37.41431},
  {name: 'Chase', longitude: -122.9235, latitude: 37.52352},
];

const currentUser = [];
const friends = [];

function getThisUser(){
  return fetch('http://18.189.19.59:3000/userinfo', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({})
  }).then(res => {
    currentUser.push(res); //add to the locations array
  })
  // .then(getFriends())
  // .then(getLocations('Nafis', sendLocationToScaledrone))
  .catch(error => console.error(error));
}


function getFriends(){
  const requestOptions = {
      method: 'POST',
      headers: {Accept: 'application/json'  , 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {username: currentUser[0].username} //check this
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
      .catch(error=> console.log(error))
}

// getFriends();

function getLocations(name, callback) {
  let status;
  return fetch('http://18.219.228.229:3000/get_gps', {
  // return fetch('https://35d4027e-f230-4e9c-9576-a2f41c8d937c.mock.pstmn.io/get_gps', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username: name})
  }).then(response => response.json())
  .then(res => {
    status = res.status;
    console.log(res);
    locations.push(res); //add to the locations array

  }).then(res => {
    callback(); //utilizing a callback to make sure the next function, sendLocationsToScaledrone waits for this fetch call
    //to update the locations array.
  })
  .catch(error => console.error(error));
}




function doAuthRequest(clientId, name) {
  let status;
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



getLocations('Nafis', sendLocationToScaledrone);



function sendLocationToScaledrone(location){
  locations.forEach(location => {
      const drone = new Scaledrone('izEwJATwy5REKqUw');
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
          const delta = moveInRandomDirection();

          location.latitude += delta.dlat;
          location.longitude += delta.dlon;
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


//how it was being done before
// locations.forEach(location => {
//     const drone = new Scaledrone('izEwJATwy5REKqUw');
//     drone.on('error', error => console.error(error));
//     drone.on('open', error => {
//       if (error) {
//         return console.error(error);
//       }
//       doAuthRequest(drone.clientId, location.name)
//         .then(jwt => drone.authenticate(jwt));
//     });
//     drone.on('authenticate', error => {
//       if (error) {
//         return console.error(error);
//       }
//       setInterval(() => {
//         const delta = moveInRandomDirection();
//
//         location.latitude += delta.dlat;
//         location.longitude += delta.dlon;
//         drone.publish({
//           room: 'observable-locations',
//           message: location
//         });
//       }, 1000);
//     });
//     // subscribe so our data is avaiable to the observable room
//     drone.subscribe('observable-locations');
//   });


function moveInRandomDirection(maxDistance = 0.005) {
  const angle = Math.random() * Math.PI * 2;
  const distance = maxDistance * Math.random();
  return {
    dlat: Math.cos(angle) * distance,
    dlon: Math.sin(angle) * distance,
  };
}
