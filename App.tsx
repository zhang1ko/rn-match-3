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
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationScreenProp } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import InstructionScreen from './screens/InstructionScreen';

import level1 from './components/levels/Level1';

import GridBoard from './components/GridBoard';
import Square from './components/square/Square';
import Game from './components/game/Game'
import Level1 from './components/levels/Level1';
import Level2 from './components/levels/Level2';
import Level3 from './components/levels/Level3';


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
                    <Stack.Screen name="Level 1" component={Level1} />
                    <Stack.Screen name="Level 2" component={Level2} />
                    <Stack.Screen name="Level 3" component={Level3} />
                    <Stack.Screen name="Instructions" component={InstructionScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
};

const styles = StyleSheet.create({

});
