import React, { Component } from 'react';
import {
View,
Text,
} from 'react-native';
import {styles} from './ScreenStyles';

export default class InstructionScreen extends React.Component<object> {
    render() {
        return (
            <View style={[styles.screen, {justifyContent: 'flex-start'}]}>
                <Text>How to Play/中文 </Text>
                <Text>Swap squares to make three or more same-colored squares in a row. 
                    Every move has to make a match of three or more squares. 
                    Clear squares to obtain points and reach the poimnts thresshold to 
                    level up. Each level higher means you need more matches to advance. 
                    There is a limited number of moves one can make in each level.
                </Text>
                
            </View>
        );
    }
}