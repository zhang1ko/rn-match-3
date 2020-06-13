import React, { Component } from 'react';
import {
StyleSheet,
View,
Text,
Button,
TouchableOpacity
} from 'react-native';
import {styles} from './ScreenStyles';

import Game from '../components/game/Game'

export default class GameScreen extends React.Component<object> {
    render(){
        return (
            <View style={styles.screen}>
                <Game />
            </View>
        );
    }
}