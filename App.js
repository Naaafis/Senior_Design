import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, View, Text, Button, Alert} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiZHNoaW1vbiIsImEiOiJja3Vzd2U0dWM1ajhkMnBtbnYwY20zdGowIn0.2jziz-eUuyqS5zzHUh0uUg',
);

const App = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [userLoc, setUserLoc] = useState(null);
  const [zoomLevelVar, setZoomLevelVar] = useState(10);

  const onSelectPoint = event => {
    setCoordinates(event.geometry.coordinates);
    setSelectedPoint(event.properties.id);
    // setZoomLevelVar();

  };

  return (
    <>

      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <Button title="Decrease" onPress={() => setZoomLevelVar(zoomLevelVar - 1)}/>
          <Button title="Increase" onPress={() => setZoomLevelVar(zoomLevelVar + 1)}/>
          <MapboxGL.MapView
            style={styles.map}
            zoomEnabled = {true}
            onPress={event => {
              setCoordinates(event.geometry.coordinates);
              setSelectedPoint(null);
            }}>
            <MapboxGL.Camera
              zoomLevel= {zoomLevelVar}
              //removed centerCoordinate because followUserLocation now will put the center directly to where the user is.
              // centerCoordinate={[-71.0589, 42.3601]}
              followUserLocation = {true}
            />
            <MapboxGL.PointAnnotation
              id="BU"
              coordinate={[-71.100295, 42.3497]}
              onSelected={onSelectPoint}
            />
            <MapboxGL.UserLocation
              visible = {true}
              showsUserHeadingLocation= {true}
              renderMode = 'native'
            />
          </MapboxGL.MapView>
          {coordinates ? (
            <View style={styles.coordinateViewContainer}>
              <View style={styles.coordinateView}>
                {selectedPoint ? <Text>{selectedPoint}</Text> : null}
                <Text>
                  {coordinates[0]}, {coordinates[1]}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      </SafeAreaView>


    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
  coordinateViewContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 5,
    width: '100%',
    backgroundColor: 'transparent',
  },
  coordinateView: {
    padding: 5,
    backgroundColor: '#fff',
    flex: 1,
  },
});



export default App;
