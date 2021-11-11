import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, View, Text} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiZHNoaW1vbiIsImEiOiJja3Vzd2U0dWM1ajhkMnBtbnYwY20zdGowIn0.2jziz-eUuyqS5zzHUh0uUg',
);

const App = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const onSelectPoint = event => {
    setCoordinates(event.geometry.coordinates);
    setSelectedPoint(event.properties.id);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <MapboxGL.MapView
            style={styles.map}
            onPress={event => {
              setCoordinates(event.geometry.coordinates);
              setSelectedPoint(null);
            }}>
            <MapboxGL.Camera
              zoomLevel={8}
              centerCoordinate={[-94.5786, 39.0997]}
            />
            <MapboxGL.PointAnnotation
              id="Jack Stack"
              coordinate={[-94.585701, 39.087269]}
              onSelected={onSelectPoint}
            />
            <MapboxGL.PointAnnotation
              id="KC Joe's"
              coordinate={[-94.769043, 38.911251]}
              onSelected={onSelectPoint}
            />
            <MapboxGL.PointAnnotation
              id="Smokehouse BBQ"
              coordinate={[-94.66092, 39.24837]}
              onSelected={onSelectPoint}
            />
            <MapboxGL.PointAnnotation
              id="Slaps BBQ"
              coordinate={[-94.624443, 39.102489]}
              onSelected={onSelectPoint}
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
