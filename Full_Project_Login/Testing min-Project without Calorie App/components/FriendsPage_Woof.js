import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import * as firebase from "firebase";

import Constants from 'expo-constants';

export default class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentUser: null, foodHistory: null, foodTotal: null };
    }

    componentDidMount() {
        const { currentUser } = firebase.auth();
        this.setState({ currentUser })
        //const foodHistory = readFoodItem(currentUser);

        let foodArray = [];

        firebase
            .database()
            .ref('users/' + currentUser.uid)
            .once('value', snapshot => {
                let foodLog = snapshot.val();
                let foodLogArray = Object.entries(foodLog);
                for (const [key, value] of foodLogArray) {
                    foodArray.push(Object.entries(value));
                }

                let fullString = "";
                let totalCalFullString = "";

                var totalCalories = 0;
                var totalFats = 0;
                var totalSugars = 0;

                for (let i = 0; i < foodArray.length; i++) {
                    let myString =
                        foodArray[i][4][0] + ": " + foodArray[i][4][1] + "\n" +
                        foodArray[i][0][0] + ": " + foodArray[i][0][1] + "\n" +
                        foodArray[i][1][0] + ": " + foodArray[i][1][1] + "\n" +
                        foodArray[i][2][0] + ": " + foodArray[i][2][1] + "\n" +
                        foodArray[i][3][0] + ": " + foodArray[i][3][1] + "\n" + "\n\n";

                    fullString = fullString + myString;

                    totalCalories += foodArray[i][0][1];
                    totalFats += foodArray[i][1][1];
                    totalSugars += foodArray[i][3][1];
                }

                totalCalFullString = "Total Nutrients: \n"
                                   + foodArray[0][0][0] + ": " + totalCalories + "\n"
                                   + foodArray[0][1][0] + ": " + totalFats + "\n"
                                   + foodArray[0][3][0] + ": " + totalSugars + "\n";

                console.log(foodArray[0][3][0]);
                console.log(totalSugars);

                this.setState({ foodHistory: fullString })
                this.setState({ foodTotal: totalCalFullString })
            });

    }


    render() {
        //const { currentUser, foodHistory, foodTotal } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.total_text}>{'\n\n'} {this.state.foodTotal} {'\n\n'}</Text>
                    <Text style={styles.text}>{this.state.foodHistory} {'\n\n'}</Text>
                    <View style={styles.exitButton}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Main")} style={styles.button}>
                            <Text style={styles.buttonText}>Return to Home Screen</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </SafeAreaView>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
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
        width: 420
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center'
    },
    scrollView: {
        backgroundColor: 'thistle',
        marginHorizontal: 20,
    },
    text: {
        fontSize: 30,
    },
    total_text: {
        fontSize: 45,
        textAlign: 'center'
    }
});