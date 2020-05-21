import React, { Component } from 'react';
import{
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback
} from 'react-native';
//import GestureRecognizer from 'react-native-swipe-gestures';

const jewelStyle = (option: string): { backgroundColor: string } => {
    switch (option){
        case 'A':
            return {
                backgroundColor: "#FF0000",
            }
        case 'B':
            return {
                backgroundColor: "#0000ff",
            }
        case 'C':
            return {
                backgroundColor: "#ffff00",
            }
        case 'D':
            return {
                backgroundColor: "#00FF00",
            }
        default:
            return {
                backgroundColor: "#ccc",
            }
            
    }
}

export default class Square {
    type: string;
    key: number;
    constructor(props: { title: string; key: number}){
        this.type = props.title; 
        this.key = props.key;
     }

     render () {
        return (
            <TouchableNativeFeedback /*onPress={this.props.onPress}*/ >
                <View style={[styles.item, jewelStyle(this.type)] } > 
                    <Text>{this.type}</Text> 
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    item: {
      padding: 5,
      margin: 5,
      width: 35,
      height: 35,
      borderColor: 'black',
      borderWidth: 1,
      alignItems: 'center'
    },
    red: {
        backgroundColor: "#FF0000"
    },
    blue: {
        backgroundColor: "#0000ff"
    }
});
