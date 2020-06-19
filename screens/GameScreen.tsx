import React, { Component } from 'react';
import {
StyleSheet,
View,
Text,
Button,
TouchableOpacity
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import {styles} from './ScreenStyles';

import Game from '../components/game/Game'
import Level1 from '../components/levels/Level1'

interface GameScreenProps {
    navigation: NavigationScreenProp<any,any>
};

export default class GameScreen extends React.Component<GameScreenProps, object> {
    render(){
        return (
            <View style={styles.screen}>
                <TouchableOpacity style={ styles.button }
                        onPress={() => this.props.navigation.navigate('Level 1')}>
                    <Text>Level 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.button }
                        onPress={() => this.props.navigation.navigate('Level 2')}>
                    <Text>Level 2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.button }
                        onPress={() => this.props.navigation.navigate('Level 3')}>
                    <Text>Level 3</Text>
                </TouchableOpacity>
            </View>
        );
    }
}