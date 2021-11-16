import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { AsyncStorage } from "react-native";

import { useNavigation } from '@react-navigation/native';

import * as firebase from 'firebase';

let FoodItem = {
    Title: "",
    Calories: 10,
    Fats: 10,
    Sugar: 10,
    Servings: 1,
};

export default class BarcodeScanner extends React.Component {
    state = { scanned: false, hasPermission: null }

    async componentDidMount() {

        const { status } = await BarCodeScanner.requestPermissionsAsync();
        console.log(status);
        this.state.hasPermission = status;

        if (this.state.hasPermission === null) {
            console.log("death");
            return <Text>Requesting for camera permission</Text>;
        }
        if (this.state.hasPermission === false) {
            console.log("death2");
            return <Text>No access to camera</Text>;
        }
    }

    render() {

        //enter your FDC API Key Here and uncomment

        ////////////////////////////////////////////////////////////
        //                                                        //
        //  let fdc =    ????????????????????????????????         //                                              
        //                                                        //
        ////////////////////////////////////////////////////////////

        let fdc = 'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=TpuNpCiJzfPy5vcMvI9xP2yBwowcY8QqVpCus6De&query=';
        let code = '04976400'; //sprite

        async function getFDC(link) {
            let response = await fetch(link);
            return await response.json();
        }

        const handleBarCodeScanned = ({ type, data }) => {
            if (this.state.scanned == false) {

                console.log(this.state.scanned);
                alert(`Bar code with type ${type} and data ${data} has been scanned!`);
                this.state.scanned = true;
                getFDC(fdc + data).then(fdc_data => {
                    console.log("This product is ", fdc_data.foods[0].description);
                    console.log("It has ", fdc_data.foods[0].foodNutrients[3].value, "KCAL");
                    console.log("It has ", fdc_data.foods[0].foodNutrients[1].value, "grams of fat");
                    console.log("It has ", fdc_data.foods[0].foodNutrients[4].value, "grams of sugar");

                    FoodItem.Title = fdc_data.foods[0].description;
                    FoodItem.Calories = fdc_data.foods[0].foodNutrients[3].value;
                    FoodItem.Fats = fdc_data.foods[0].foodNutrients[1].value;
                    FoodItem.Sugar = fdc_data.foods[0].foodNutrients[4].value;
                    console.log("FoodItem.Calories is ", FoodItem.Calories);

                    this.props.navigation.navigate("Info", {
                        Title: FoodItem.Title,
                        Calories: FoodItem.Calories,
                        Fats: FoodItem.Fats,
                        Sugar: FoodItem.Sugar,
                        Servings: FoodItem.Servings
                    });
                }
                );
                console.log("a");
            }
        };

        return (
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={this.state.scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                {this.state.scanned && <Button title={'Tap to Scan Again'} onPress={() => this.state.scanned = false} />}

                <View style={styles.exitButton}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Main")} style={styles.button}>
                        <Text style={styles.buttonText}>Exit Scanning</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    exitButton: {
        position: 'absolute',
        justifyContent: 'center',
        bottom: 40
    },
    button: {
        backgroundColor: "blue",
        padding: 20,
        borderRadius: 5,
        height: 90,
        position: 'absolute',
        justifyContent: 'center',
        bottom: -40,
        width: 450
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center'
    },
    instructions: {
        fontSize: 20,
        textAlign: 'center',
        position: 'absolute',
        top: 40

    }
});
