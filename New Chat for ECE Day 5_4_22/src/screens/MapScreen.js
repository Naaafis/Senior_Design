import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

class MapScreen extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Map</Text>

        <View style={styles.map}></View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'darksalmon',
  },
  scroll: {
    alignSelf: 'center',
    backgroundColor: 'peachpuff',
    maxHeight: 500,
    width: '90%',
  },
  title: {
    alignSelf: 'center',
    marginTop: 1,
    fontFamily: 'Sarpanch-ExtraBold',
    fontSize: 48,
    color: 'yellow',
  },
  body: {
    marginTop: 30,
    marginLeft: 20,
    fontFamily: 'Sarpanch-Bold',
    fontSize: 30,
    color: 'black',
  },
  inputBox: {
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    fontSize: 18,
    color: 'black',
    backgroundColor: 'bisque',
  },
  buttonContainer: {
    marginTop: 24,
    alignSelf: 'center',
    minWidth: 200,
    elevation: 10,
    backgroundColor: '#009688',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  map: {
    alignSelf: 'center',
    marginTop: 10,
    width: 340,
    height: 480,
    backgroundColor: 'antiquewhite',
  },
});

export {MapScreen};
