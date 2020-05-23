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

const Tile_Size: number = 35;
const colors = {
    white: '#fff',
    grey: "#ccc",
    red: "#FF0000",
    blue: "#0000ff",
    yellow: "#ffff00",
    green: "#00FF00"
}

const notifyMessage = (msg: string) => {
    if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
    } else {
        Alert.alert(msg);
    }
}

const jewelStyle = (option: string): { backgroundColor: string } => {
    switch (option){
        case '1':
            return {
                backgroundColor: colors.red
            }
        case '2':
            return {
                backgroundColor: colors.blue
            }
        case '3':
            return {
                backgroundColor: colors.yellow
            }
        case '4':
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
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 35,
            detectSwipeUp: true,
            detectSwipeDown: true,
            detectSwipeLeft: true,
            detectSwipeRight: true
        };

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
                    else if (dx > Tile_Size && this.key % 7 !== 0) {
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

const styles = StyleSheet.create({
    item: {
      padding: 5,
      margin: 5,
      width: Tile_Size,
      height: 35,
      borderColor: 'black',
      borderWidth: 1,
      alignItems: 'center'
    }
});
