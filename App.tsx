/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
StyleSheet,
View,
Text,
Button,
TouchableOpacity
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationScreenProp } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import InstructionScreen from './screens/InstructionScreen';

import GridBoard from './components/GridBoard';
import Square from './components/square/Square';
import Game from './components/game/Game'


interface AppState {
    
}

const Stack = createStackNavigator();

export default class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            
        }
    }

    render () {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Game" component={GameScreen} />
                    <Stack.Screen name="Instructions" component={InstructionScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
};

const styles = StyleSheet.create({

});
