import React, { Component } from 'react';
import{
    StyleSheet,
    Text,
    View,
    ToastAndroid, 
    Platform, 
    Alert,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { styles } from './SquareStyle';
import { Tile_Size, colors, config } from '../values';

const notifyMessage = (msg: string) => {
    if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
        console.log("Toast shown.");
    } else {
        Alert.alert(msg);
    }
}

const jewelStyle = (option: string): { backgroundColor: string } => {
    switch (option){
        case '1':
            return {backgroundColor: colors.red}
        case '2':
            return {backgroundColor: colors.blue}
        case '3':
            return {backgroundColor: colors.yellow}
        case '4':
            return {backgroundColor: colors.green}
        case '5': {
            return {backgroundColor: colors.white}
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
    swap: (location: number, direction: string) => Square[];
    constructor(props: { title: string; key: number, swap: (location: number, direction: string) => Square[]}){
        this.type = props.title; 
        this.key = props.key;
        this.swap = props.swap;
     }

     onSwipe(direction: String, gestureState: object) {
        console.log("You swiped square " + this.type);
        console.log("  at position " + this.key);
        console.log("  direction is "+ direction);
        console.log();
     }

     setKey(newKey: number) {
         this.key = newKey;
     }

     render () {    
        
        return (
            <GestureRecognizer
                onSwipe={(gestureName, gestureState) => {
                    const {dy} = gestureState;
                    const {dx} = gestureState;
                    if (dy > Tile_Size && this.key < 56) {
                        this.onSwipe("down", gestureState)
                        this.swap(this.key, "down")
                    }
                    else if (dy < -Tile_Size && this.key > 7) {
                        this.onSwipe("up", gestureState)
                        this.swap(this.key, "up")
                    }
                    else if (dx > Tile_Size && this.key % 8 !== 7) {
                        this.onSwipe("right", gestureState)
                        this.swap(this.key, "right")
                    }
                    else if (dx < -Tile_Size && this.key%8 !== 0) {
                        this.onSwipe("left", gestureState)
                        this.swap(this.key, "left");
                    }
                    else {
                        notifyMessage("Invalid move");
                    }
                }}

                config={config}
            >
                <View style={[styles.item, jewelStyle(this.type)] } > 
                    <Text>{this.type}</Text> 
                </View>
            </GestureRecognizer>
            
        );
    }
}
