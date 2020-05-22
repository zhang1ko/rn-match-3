import React, { Component } from 'react';
import{
    StyleSheet,
    Text,
    View,
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

     onSwipe(direction: String, gestureState: object) {
         console.log("You swiped square " + this.type);
         console.log(direction);
         console.log();
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
                    if (dy > Tile_Size) {
                        this.onSwipe("down", gestureState)
                    }
                    else if (dy < -Tile_Size) {
                        this.onSwipe("up", gestureState)
                    }
                    else if (dx > Tile_Size) {
                        this.onSwipe("right", gestureState)
                    }
                    else if (dx < -Tile_Size) {
                        this.onSwipe("left", gestureState)
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
