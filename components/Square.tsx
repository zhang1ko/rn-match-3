import React, { Component } from 'react';
import{
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback
} from 'react-native';

const colors = {
    white: '#fff',
    grey: "#ccc",
    red: "#FF0000",
    blue: "#0000ff",
    yellow: "#ffff00",
    green: "#00FF00"
}

const jewelStyle = (option: string): { backgroundColor: string } => {
    switch (option){
        case 'A':
            return {
                backgroundColor: colors.red
            }
        case 'B':
            return {
                backgroundColor: colors.blue
            }
        case 'C':
            return {
                backgroundColor: colors.yellow
            }
        case 'D':
            return {
                backgroundColor: colors.green
            }
        default:
            return {
                backgroundColor: colors.grey
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
    }
});
