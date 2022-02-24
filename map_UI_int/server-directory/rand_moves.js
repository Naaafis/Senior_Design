const Scaledrone = require('scaledrone-node');
const fetch = require('node-fetch');
// const SCALEDRONE_CHANNEL_ID =  {izEwJATwy5REKqUw};

const locations = [
  {name: 'Nafis', longitude: -122.14114, latitude: 37.370134},
  {name: 'Rajiv', longitude: -122.532, latitude: 37.541414},
  {name: 'Justin', longitude: -122.235, latitude: 37.41431},
  {name: 'Chase', longitude: -122.9235, latitude: 37.52352},
];

function doAuthRequest(clientId, name) {
  let status;
  return fetch('http://localhost:3000/auth', {
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

function moveInRandomDirection(maxDistance = 0.005) {
  const angle = Math.random() * Math.PI * 2;
  const distance = maxDistance * Math.random();
  return {
    dlat: Math.cos(angle) * distance,
    dlon: Math.sin(angle) * distance,
  };
}
